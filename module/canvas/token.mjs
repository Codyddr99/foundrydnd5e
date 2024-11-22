/**
 * Extend the base Token class to implement additional system-specific logic.
 */
export default class Token5e extends Token {

  /**
   * Update the token ring when this token is targeted.
   * @param {User5e} user         The user whose targeting has changed.
   * @param {Token5e} token       The token that was targeted.
   * @param {boolean} targeted    Is the token targeted or not?
   */
  static onTargetToken(user, token, targeted) {
    if ( !targeted ) return;
    if ( !token.hasDynamicRing ) return;
    const color = Color.from(user.color);
    token.ring.flashColor(color, { duration: 500, easing: token.ring.constructor.easeTwoPeaks });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _drawBar(number, bar, data) {
    if ( data.attribute === "attributes.hp" ) return this._drawHPBar(number, bar, data);
    return super._drawBar(number, bar, data);
  }

  /* -------------------------------------------- */

  /**
   * Specialized drawing function for HP bars.
   * @param {number} number      The Bar number
   * @param {PIXI.Graphics} bar  The Bar container
   * @param {object} data        Resource data for this bar
   * @private
   */
  _drawHPBar(number, bar, data) {

    // Extract health data
    let {value, max, effectiveMax, temp, tempmax} = this.document.actor.system.attributes.hp;
    temp = Number(temp || 0);
    tempmax = Number(tempmax || 0);

    // Differentiate between effective maximum and displayed maximum
    effectiveMax = Math.max(0, effectiveMax);
    let displayMax = max + (tempmax > 0 ? tempmax : 0);

    // Allocate percentages of the total
    const tempPct = Math.clamp(temp, 0, displayMax) / displayMax;
    const colorPct = Math.clamp(value, 0, effectiveMax) / displayMax;
    const hpColor = dnd5r.documents.Actor5e.getHPColor(value, effectiveMax);

    // Determine colors to use
    const blk = 0x000000;
    const c = CONFIG.DND5R.tokenHPColors;

    // Determine the container size (logic borrowed from core)
    const w = this.w;
    let h = Math.max((canvas.dimensions.size / 12), 8);
    if ( this.document.height >= 2 ) h *= 1.6;
    const bs = Math.clamp(h / 8, 1, 2);
    const bs1 = bs+1;

    // Overall bar container
    bar.clear();
    bar.beginFill(blk, 0.5).lineStyle(bs, blk, 1.0).drawRoundedRect(0, 0, w, h, 3);

    // Temporary maximum HP
    if (tempmax > 0) {
      const pct = max / effectiveMax;
      bar.beginFill(c.tempmax, 1.0).lineStyle(1, blk, 1.0).drawRoundedRect(pct*w, 0, (1-pct)*w, h, 2);
    }

    // Maximum HP penalty
    else if (tempmax < 0) {
      const pct = (max + tempmax) / max;
      bar.beginFill(c.negmax, 1.0).lineStyle(1, blk, 1.0).drawRoundedRect(pct*w, 0, (1-pct)*w, h, 2);
    }

    // Health bar
    bar.beginFill(hpColor, 1.0).lineStyle(bs, blk, 1.0).drawRoundedRect(0, 0, colorPct*w, h, 2);

    // Temporary hit points
    if ( temp > 0 ) {
      bar.beginFill(c.temp, 1.0).lineStyle(0).drawRoundedRect(bs1, bs1, (tempPct*w)-(2*bs1), h-(2*bs1), 1);
    }

    // Set position
    let posY = (number === 0) ? (this.h - h) : 0;
    bar.position.set(0, posY);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onApplyStatusEffect(statusId, active) {
    const applicableEffects = [CONFIG.specialStatusEffects.DEFEATED, CONFIG.specialStatusEffects.INVISIBLE];
    if ( applicableEffects.includes(statusId) && this.hasDynamicRing ) {
      this.renderFlags.set({refreshRingVisuals: true});
    }
    super._onApplyStatusEffect(statusId, active);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _configureFilterEffect(statusId, active) {
    if ( (statusId === CONFIG.specialStatusEffects.INVISIBLE) && this.hasDynamicRing ) active = false;
    return super._configureFilterEffect(statusId, active);
  }

  /* -------------------------------------------- */

  /** @override */
  getRingColors() {
    return this.document.getRingColors();
  }

  /* -------------------------------------------- */

  /** @override */
  getRingEffects() {
    return this.document.getRingEffects();
  }
}
