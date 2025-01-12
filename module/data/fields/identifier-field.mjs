/**
 * Special case StringField that includes automatic validation for identifiers.
 */
export default class IdentifierField extends foundry.data.fields.StringField {
  /** @override */
  _validateType(value) {
    if ( !dnd5r.utils.validators.isValidIdentifier(value) ) {
      throw new Error(game.i18n.localize("DND5R.IdentifierError"));
    }
  }
}
