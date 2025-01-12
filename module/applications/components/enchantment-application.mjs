/**
 * Application to handle applying enchantments to items from a chat card.
 */
export default class EnchantmentApplicationElement extends HTMLElement {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The chat message with which this enchantment is associated.
   * @type {ChatMessage5e}
   */
  chatMessage;

  /* -------------------------------------------- */

  /**
   * Area where the enchantment limit & current count is displayed.
   * @type {HTMLElement}
   */
  countArea;

  /* -------------------------------------------- */

  /**
   * Area where items can be dropped to enchant.
   * @type {HTMLElement}
   */
  dropArea;

  /* -------------------------------------------- */

  /**
   * Activity providing the enchantment that will be applied.
   * @type {Item5e}
   */
  get enchantmentActivity() {
    return this.chatMessage.getAssociatedActivity();
  }

  /* -------------------------------------------- */

  /**
   * Item providing the enchantment that will be applied.
   * @type {Item5e}
   */
  get enchantmentItem() {
    return this.chatMessage.getAssociatedItem();
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  connectedCallback() {
    const messageId = this.closest("[data-message-id]")?.dataset.messageId;
    this.chatMessage = game.messages.get(messageId);
    if ( !this.chatMessage ) return;

    // Build the frame HTML only once
    if ( !this.dropArea ) {
      const div = document.createElement("div");
      div.classList.add("enchantment-control");
      div.innerHTML = '<div class="drop-area"></div>';
      this.replaceChildren(div);
      this.dropArea = div.querySelector(".drop-area");
      this.addEventListener("drop", this._onDrop.bind(this));
      this.addEventListener("click", this._onRemoveEnchantment.bind(this));
    }

    // Calculate the maximum targets
    let item = this.enchantmentItem;
    const scaling = this.chatMessage.getFlag("dnd5r", "scaling");
    if ( scaling ) item = item.clone({ "flags.dnd5r.scaling": scaling });
    const activity = item.system.activities.get(this.enchantmentActivity.id);
    const maxTargets = activity.target?.affects?.count;
    if ( maxTargets ) {
      if ( !this.countArea ) {
        const div = document.createElement("div");
        div.classList.add("count-area");
        this.querySelector(".enchantment-control").append(div);
        this.countArea = this.querySelector(".count-area");
      }
      this.countArea.innerHTML = game.i18n.format("DND5R.ENCHANT.Enchanted", {
        current: '<span class="current">0</span>',
        max: `<span class="max">${maxTargets}<span>`
      });
    } else if ( this.countArea ) {
      this.countArea.remove();
    }

    this.buildItemList();
  }

  /* -------------------------------------------- */

  /**
   * Build a list of enchanted items. Will be called whenever the enchanted items are changed in order to update
   * the card list.
   */
  async buildItemList() {
    const enchantedItems = await dnd5r.registry.enchantments.applied(this.enchantmentActivity.uuid).map(enchantment => {
      const item = enchantment.parent;
      const div = document.createElement("div");
      div.classList.add("preview");
      div.dataset.enchantmentUuid = enchantment.uuid;
      div.innerHTML = `
        <img src="${item.img}" class="gold-icon" alt="${item.name}">
        <span class="name">${item.name}</span>
      `;
      if ( item.isOwner ) {
        const control = document.createElement("a");
        control.ariaLabel = game.i18n.localize("DND5R.ENCHANTMENT.Action.Remove");
        control.dataset.action = "removeEnchantment";
        control.dataset.tooltip = "DND5R.ENCHANTMENT.Action.Remove";
        control.innerHTML = '<i class="fa-solid fa-rotate-left" inert></i>';
        div.append(control);
      }
      return div;
    });
    if ( enchantedItems.length ) {
      this.dropArea.replaceChildren(...enchantedItems);
    } else {
      this.dropArea.innerHTML = `<p>${game.i18n.localize("DND5R.ENCHANT.DropArea")}</p>`;
    }
    if ( this.countArea ) {
      this.countArea.querySelector(".current").innerText = enchantedItems.length;
    }
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle dropping an item onto the control.
   * @param {Event} event  Triggering drop event.
   */
  async _onDrop(event) {
    event.preventDefault();
    const data = TextEditor.getDragEventData(event);
    const effect = this.enchantmentItem.effects.get(this.chatMessage.getFlag("dnd5r", "use.enchantmentProfile"));
    if ( (data.type !== "Item") || !effect ) return;
    const droppedItem = await Item.implementation.fromDropData(data);

    // Validate against the enchantment's restraints on the origin item
    const errors = this.enchantmentActivity.canEnchant(droppedItem);
    if ( errors?.length ) {
      errors.forEach(err => ui.notifications.error(err.message, { console: false }));
      return;
    }

    // If concentration is required, ensure it is still being maintained & GM is present
    const concentrationId = this.chatMessage.getFlag("dnd5r", "use.concentrationId");
    const concentration = effect.parent.actor.effects.get(concentrationId);
    if ( concentrationId && !concentration ) {
      ui.notifications.error("DND5R.ENCHANT.Warning.ConcentrationEnded", { console: false, localize: true });
      return;
    }
    if ( !game.user.isGM && concentration && !concentration.actor?.isOwner ) {
      ui.notifications.error("DND5R.EffectApplyWarningConcentration", { console: false, localize: true });
      return;
    }

    const effectData = effect.toObject();
    effectData.origin = this.enchantmentActivity.uuid;
    const applied = await ActiveEffect.create(effectData, {
      parent: droppedItem, keepOrigin: true, chatMessageOrigin: this.chatMessage.id
    });
    if ( concentration ) await concentration.addDependent(applied);
  }

  /* -------------------------------------------- */

  /**
   * Handle removing an enchantment.
   * @param {Event} event  Triggering drop event.
   */
  async _onRemoveEnchantment(event) {
    if ( event.target.dataset.action !== "removeEnchantment" ) return;
    const enchantmentUuid = event.target.closest("[data-enchantment-uuid]")?.dataset.enchantmentUuid;
    const enchantment = await fromUuid(enchantmentUuid);
    enchantment?.delete({ chatMessageOrigin: this.chatMessage.id });
  }
}
