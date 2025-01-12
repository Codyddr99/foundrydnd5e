import ForwardSheet from "../../applications/activity/forward-sheet.mjs";
import ForwardActivityData from "../../data/activity/forward-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for triggering another activity with modified consumption.
 */
export default class ForwardActivity extends ActivityMixin(ForwardActivityData) {
  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "DND5R.FORWARD"];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(
    foundry.utils.mergeObject(super.metadata, {
      type: "forward",
      img: "systems/dnd5r/icons/svg/activity/forward.svg",
      title: "DND5R.FORWARD.Title",
      sheetClass: ForwardSheet
    }, { inplace: false })
  );

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */

  /** @override */
  async use(usage={}, dialog={}, message={}) {
    const usageConfig = foundry.utils.mergeObject({
      cause: {
        activity: this.relativeUUID
      },
      consume: {
        resources: false,
        spellSlot: false
      }
    }, usage);

    const activity = this.item.system.activities.get(this.activity.id);
    if ( !activity ) ui.notifications.error("DND5R.FORWARD.Warning.NoActivity", { localize: true });
    return activity?.use(usageConfig, dialog, message);
  }
}
