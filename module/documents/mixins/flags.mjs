/**
 * Mixin used to add system flags enforcement to types.
 * @type {function(Class): Class}
 * @mixin
 */
export default Base => class extends Base {

  /**
   * Get the data model that represents system flags.
   * @type {typeof DataModel|null}
   * @abstract
   */
  get _systemFlagsDataModel() {
    return null;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareData() {
    super.prepareData();
    if ( ("dnd5r" in this.flags) && this._systemFlagsDataModel ) {
      this.flags.dnd5r = new this._systemFlagsDataModel(this._source.flags.dnd5r, { parent: this });
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async setFlag(scope, key, value) {
    if ( (scope === "dnd5r") && this._systemFlagsDataModel ) {
      let diff;
      const changes = foundry.utils.expandObject({ [key]: value });
      if ( this.flags.dnd5r ) diff = this.flags.dnd5r.updateSource(changes, { dryRun: true });
      else diff = new this._systemFlagsDataModel(changes, { parent: this }).toObject();
      return this.update({ flags: { dnd5r: diff } });
    }
    return super.setFlag(scope, key, value);
  }
};
