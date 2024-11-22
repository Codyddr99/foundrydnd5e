/**
 * The D&D fifth edition game system for Foundry Virtual Tabletop
 * A system for playing the fifth edition of the world's most popular role-playing game.
 * Author: Atropos
 * Software License: MIT
 * Content License: https://www.dndbeyond.com/attachments/39j2li89/SRD5.1-CCBY4.0License.pdf
 * Repository: https://github.com/foundryvtt/dnd5r
 * Issue Tracker: https://github.com/Codyddr99/foundrydnd5r/issues
 */

// Import Configuration
import DND5R from "./module/config.mjs";
import { registerSystemKeybindings, registerSystemSettings, registerDeferredSettings } from "./module/settings.mjs";

// Import Submodules
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dataModels from "./module/data/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as enrichers from "./module/enrichers.mjs";
import * as Filter from "./module/filter.mjs";
import * as migrations from "./module/migration.mjs";
import {default as registry} from "./module/registry.mjs";
import * as utils from "./module/utils.mjs";
import {ModuleArt} from "./module/module-art.mjs";
import registerModuleData from "./module/module-registration.mjs";
import Tooltips5e from "./module/tooltips.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.dnd5r = {
  applications,
  canvas,
  config: DND5R,
  dataModels,
  dice,
  documents,
  enrichers,
  Filter,
  migrations,
  registry,
  utils
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  globalThis.dnd5r = game.dnd5r = Object.assign(game.system, globalThis.dnd5r);
  console.log(`D&D 5e | Initializing the D&D Fifth Game System - Version ${dnd5r.version}\n${DND5R.ASCII}`);

  // Record Configuration Values
  CONFIG.DND5R = DND5R;
  CONFIG.ActiveEffect.documentClass = documents.ActiveEffect5e;
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.Actor.documentClass = documents.Actor5e;
  CONFIG.ChatMessage.documentClass = documents.ChatMessage5e;
  CONFIG.Combat.documentClass = documents.Combat5e;
  CONFIG.Combatant.documentClass = documents.Combatant5e;
  CONFIG.Item.collection = dataModels.collection.Items5e;
  CONFIG.Item.compendiumIndexFields.push("system.container");
  CONFIG.Item.documentClass = documents.Item5e;
  CONFIG.Token.documentClass = documents.TokenDocument5e;
  CONFIG.Token.objectClass = canvas.Token5e;
  CONFIG.User.documentClass = documents.User5e;
  CONFIG.time.roundTime = 6;
  Roll.TOOLTIP_TEMPLATE = "systems/dnd5r/templates/chat/roll-breakdown.hbs";
  CONFIG.Dice.BasicRoll = dice.BasicRoll;
  CONFIG.Dice.DamageRoll = dice.DamageRoll;
  CONFIG.Dice.D20Die = dice.D20Die;
  CONFIG.Dice.D20Roll = dice.D20Roll;
  CONFIG.MeasuredTemplate.defaults.angle = 53.13; // 5e cone RAW should be 53.13 degrees
  CONFIG.Note.objectClass = canvas.Note5e;
  CONFIG.ui.combat = applications.combat.CombatTracker5e;
  CONFIG.ui.items = dnd5r.applications.item.ItemDirectory5e;

  // Register System Settings
  registerSystemSettings();
  registerSystemKeybindings();

  // Configure module art & register module data
  game.dnd5r.moduleArt = new ModuleArt();
  registerModuleData();

  // Configure bastions
  game.dnd5r.bastion = new documents.Bastion();

  // Configure tooltips
  game.dnd5r.tooltips = new Tooltips5e();

  // Set up status effects
  _configureStatusEffects();

  // Remove honor & sanity from configuration if they aren't enabled
  if ( !game.settings.get("dnd5r", "honorScore") ) delete DND5R.abilities.hon;
  if ( !game.settings.get("dnd5r", "sanityScore") ) delete DND5R.abilities.san;

  // Legacy rules.
  if ( game.settings.get("dnd5r", "rulesVersion") === "legacy" ) {

    // Set half-casters to round down.
    delete DND5R.spellcastingTypes.leveled.progression.half.roundUp;

    // Adjust Wild Shape and Polymorph presets.
    delete DND5R.transformationPresets.wildshape.options.keepHP;
    delete DND5R.transformationPresets.wildshape.options.keepType;
    delete DND5R.transformationPresets.polymorph.options.addTemp;
    delete DND5R.transformationPresets.polymorph.options.keepHP;
    delete DND5R.transformationPresets.polymorph.options.keepType;

    // Adjust language categories.
    delete DND5R.languages.standard.children.sign;
    DND5R.languages.exotic.children.draconic = DND5R.languages.standard.children.draconic;
    delete DND5R.languages.standard.children.draconic;
    DND5R.languages.cant = DND5R.languages.exotic.children.cant;
    delete DND5R.languages.exotic.children.cant;
    DND5R.languages.druidic = DND5R.languages.exotic.children.druidic;
    delete DND5R.languages.exotic.children.druidic;
  }

  // Register Roll Extensions
  CONFIG.Dice.rolls = [dice.BasicRoll, dice.D20Roll, dice.DamageRoll];

  // Hook up system data types
  CONFIG.ActiveEffect.dataModels = dataModels.activeEffect.config;
  CONFIG.Actor.dataModels = dataModels.actor.config;
  CONFIG.Item.dataModels = dataModels.item.config;
  CONFIG.JournalEntryPage.dataModels = dataModels.journal.config;

  // Add fonts
  _configureFonts();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("dnd5r", applications.actor.ActorSheet5eCharacter, {
    types: ["character"],
    label: "DND5R.SheetClassCharacterLegacy"
  });
  DocumentSheetConfig.registerSheet(Actor, "dnd5r", applications.actor.ActorSheet5eCharacter2, {
    types: ["character"],
    makeDefault: true,
    label: "DND5R.SheetClassCharacter"
  });
  Actors.registerSheet("dnd5r", applications.actor.ActorSheet5eNPC, {
    types: ["npc"],
    label: "DND5R.SheetClassNPCLegacy"
  });
  DocumentSheetConfig.registerSheet(Actor, "dnd5r", applications.actor.ActorSheet5eNPC2, {
    types: ["npc"],
    makeDefault: true,
    label: "DND5R.SheetClassNPC"
  });
  Actors.registerSheet("dnd5r", applications.actor.ActorSheet5eVehicle, {
    types: ["vehicle"],
    makeDefault: true,
    label: "DND5R.SheetClassVehicle"
  });
  Actors.registerSheet("dnd5r", applications.actor.GroupActorSheet, {
    types: ["group"],
    makeDefault: true,
    label: "DND5R.SheetClassGroup"
  });

  DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);
  DocumentSheetConfig.registerSheet(Item, "dnd5r", applications.item.ItemSheet5e2, {
    makeDefault: true,
    label: "DND5R.SheetClassItem"
  });
  DocumentSheetConfig.unregisterSheet(Item, "dnd5r", applications.item.ItemSheet5e, { types: ["container"] });
  DocumentSheetConfig.unregisterSheet(Item, "dnd5r", applications.item.ItemSheet5e2, { types: ["container"] });
  DocumentSheetConfig.registerSheet(Item, "dnd5r", applications.item.ContainerSheet2, {
    makeDefault: true,
    types: ["container"],
    label: "DND5R.SheetClassContainer"
  });

  DocumentSheetConfig.registerSheet(JournalEntry, "dnd5r", applications.journal.JournalSheet5e, {
    makeDefault: true,
    label: "DND5R.SheetClassJournalEntry"
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "dnd5r", applications.journal.JournalClassPageSheet, {
    label: "DND5R.SheetClassClassSummary",
    types: ["class", "subclass"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "dnd5r", applications.journal.JournalMapLocationPageSheet, {
    label: "DND5R.SheetClassMapLocation",
    types: ["map"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "dnd5r", applications.journal.JournalRulePageSheet, {
    label: "DND5R.SheetClassRule",
    types: ["rule"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "dnd5r", applications.journal.JournalSpellListPageSheet, {
    label: "DND5R.SheetClassSpellList",
    types: ["spells"]
  });

  if ( game.release.generation === 12 ) {
    // TODO: Update sheet classes and remove the above check
    CONFIG.Token.prototypeSheetClass = applications.TokenConfig5e;
    DocumentSheetConfig.unregisterSheet(TokenDocument, "core", TokenConfig);
    DocumentSheetConfig.registerSheet(TokenDocument, "dnd5r", applications.TokenConfig5e, {
      label: "DND5R.SheetClassToken"
    });
  }

  // Preload Handlebars helpers & partials
  utils.registerHandlebarsHelpers();
  utils.preloadHandlebarsTemplates();

  // Enrichers
  enrichers.registerCustomEnrichers();

  // Exhaustion handling
  documents.ActiveEffect5e.registerHUDListeners();
});

/* -------------------------------------------- */

/**
 * Configure explicit lists of attributes that are trackable on the token HUD and in the combat tracker.
 * @internal
 */
function _configureTrackableAttributes() {
  const common = {
    bar: [],
    value: [
      ...Object.keys(DND5R.abilities).map(ability => `abilities.${ability}.value`),
      ...Object.keys(DND5R.movementTypes).map(movement => `attributes.movement.${movement}`),
      "attributes.ac.value", "attributes.init.total"
    ]
  };

  const altSpells = Object.entries(DND5R.spellPreparationModes).reduce((acc, [k, v]) => {
    if ( !["prepared", "always"].includes(k) && v.upcast ) acc.push(`spells.${k}`);
    return acc;
  }, []);

  const creature = {
    bar: [
      ...common.bar,
      "attributes.hp",
      ...altSpells,
      ...Array.fromRange(Object.keys(DND5R.spellLevels).length - 1, 1).map(l => `spells.spell${l}`)
    ],
    value: [
      ...common.value,
      ...Object.keys(DND5R.skills).map(skill => `skills.${skill}.passive`),
      ...Object.keys(DND5R.senses).map(sense => `attributes.senses.${sense}`),
      "attributes.spelldc"
    ]
  };

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: [...creature.bar, "resources.primary", "resources.secondary", "resources.tertiary", "details.xp"],
      value: [...creature.value]
    },
    npc: {
      bar: [...creature.bar, "resources.legact", "resources.legres"],
      value: [...creature.value, "details.cr", "details.spellLevel", "details.xp.value"]
    },
    vehicle: {
      bar: [...common.bar, "attributes.hp"],
      value: [...common.value]
    },
    group: {
      bar: [],
      value: []
    }
  };
}

/* -------------------------------------------- */

/**
 * Configure which attributes are available for item consumption.
 * @internal
 */
function _configureConsumableAttributes() {
  const altSpells = Object.entries(DND5R.spellPreparationModes).reduce((acc, [k, v]) => {
    if ( !["prepared", "always"].includes(k) && v.upcast ) acc.push(`spells.${k}.value`);
    return acc;
  }, []);

  CONFIG.DND5R.consumableResources = [
    ...Object.keys(DND5R.abilities).map(ability => `abilities.${ability}.value`),
    "attributes.ac.flat",
    "attributes.hp.value",
    "attributes.exhaustion",
    ...Object.keys(DND5R.senses).map(sense => `attributes.senses.${sense}`),
    ...Object.keys(DND5R.movementTypes).map(type => `attributes.movement.${type}`),
    ...Object.keys(DND5R.currencies).map(denom => `currency.${denom}`),
    "details.xp.value",
    "resources.primary.value", "resources.secondary.value", "resources.tertiary.value",
    "resources.legact.value", "resources.legres.value",
    ...altSpells,
    ...Array.fromRange(Object.keys(DND5R.spellLevels).length - 1, 1).map(level => `spells.spell${level}.value`)
  ];
}

/* -------------------------------------------- */

/**
 * Configure additional system fonts.
 */
function _configureFonts() {
  Object.assign(CONFIG.fontDefinitions, {
    Roboto: {
      editor: true,
      fonts: [
        { urls: ["systems/dnd5r/fonts/roboto/Roboto-Regular.woff2"] },
        { urls: ["systems/dnd5r/fonts/roboto/Roboto-Bold.woff2"], weight: "bold" },
        { urls: ["systems/dnd5r/fonts/roboto/Roboto-Italic.woff2"], style: "italic" },
        { urls: ["systems/dnd5r/fonts/roboto/Roboto-BoldItalic.woff2"], weight: "bold", style: "italic" }
      ]
    },
    "Roboto Condensed": {
      editor: true,
      fonts: [
        { urls: ["systems/dnd5r/fonts/roboto-condensed/RobotoCondensed-Regular.woff2"] },
        { urls: ["systems/dnd5r/fonts/roboto-condensed/RobotoCondensed-Bold.woff2"], weight: "bold" },
        { urls: ["systems/dnd5r/fonts/roboto-condensed/RobotoCondensed-Italic.woff2"], style: "italic" },
        {
          urls: ["systems/dnd5r/fonts/roboto-condensed/RobotoCondensed-BoldItalic.woff2"], weight: "bold",
          style: "italic"
        }
      ]
    },
    "Roboto Slab": {
      editor: true,
      fonts: [
        { urls: ["systems/dnd5r/fonts/roboto-slab/RobotoSlab-Regular.ttf"] },
        { urls: ["systems/dnd5r/fonts/roboto-slab/RobotoSlab-Bold.ttf"], weight: "bold" }
      ]
    }
  });
}

/* -------------------------------------------- */

/**
 * Configure system status effects.
 */
function _configureStatusEffects() {
  const addEffect = (effects, {special, ...data}) => {
    data = foundry.utils.deepClone(data);
    data._id = utils.staticID(`dnd5r${data.id}`);
    data.img = data.icon ?? data.img;
    delete data.icon;
    effects.push(data);
    if ( special ) CONFIG.specialStatusEffects[special] = data.id;
  };
  CONFIG.statusEffects = Object.entries(CONFIG.DND5R.statusEffects).reduce((arr, [id, data]) => {
    const original = CONFIG.statusEffects.find(s => s.id === id);
    addEffect(arr, foundry.utils.mergeObject(original ?? {}, { id, ...data }, { inplace: false }));
    return arr;
  }, []);
  for ( const [id, {label: name, ...data}] of Object.entries(CONFIG.DND5R.conditionTypes) ) {
    addEffect(CONFIG.statusEffects, { id, name, ...data });
  }
  for ( const [id, data] of Object.entries(CONFIG.DND5R.encumbrance.effects) ) {
    addEffect(CONFIG.statusEffects, { id, ...data, hud: false });
  }
}

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
  // Configure trackable & consumable attributes.
  _configureTrackableAttributes();
  _configureConsumableAttributes();

  CONFIG.DND5R.trackableAttributes = expandAttributeList(CONFIG.DND5R.trackableAttributes);
  game.dnd5r.moduleArt.registerModuleArt();
  Tooltips5e.activateListeners();
  game.dnd5r.tooltips.observe();

  // Register settings after modules have had a chance to initialize
  registerDeferredSettings();

  // Apply table of contents compendium style if specified in flags
  game.packs
    .filter(p => p.metadata.flags?.display === "table-of-contents")
    .forEach(p => p.applicationClass = applications.journal.TableOfContentsCompendium);

  // Apply custom item compendium
  game.packs.filter(p => p.metadata.type === "Item")
    .forEach(p => p.applicationClass = applications.item.ItemCompendium5e);

  // Create CSS for currencies
  const style = document.createElement("style");
  const currencies = append => Object.entries(CONFIG.DND5R.currencies)
    .map(([key, { icon }]) => `&.${key}${append ?? ""} { background-image: url("${icon}"); }`);
  style.innerHTML = `
    :is(.dnd5r2, .dnd5r2-journal) :is(i, span).currency {
      ${currencies().join("\n")}
    }
    .dnd5r2 .form-group label.label-icon.currency {
      ${currencies("::after").join("\n")}
    }
  `;
  document.head.append(style);
});

/* --------------------------------------------- */

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
  return attributes.reduce((obj, attr) => {
    foundry.utils.setProperty(obj, attr, true);
    return obj;
  }, {});
}

/* --------------------------------------------- */

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => {
  if ( game.settings.get("dnd5r", "rulesVersion") === "legacy" ) {
    const { translations, _fallback } = game.i18n;
    foundry.utils.mergeObject(translations, {
      "TYPES.Item": {
        race: game.i18n.localize("TYPES.Item.raceLegacy"),
        racePl: game.i18n.localize("TYPES.Item.raceLegacyPl")
      },
      DND5R: {
        FlagsAlertHint: game.i18n.localize("DND5R.FlagsAlertHintLegacy"),
        LanguagesExotic: game.i18n.localize("DND5R.LanguagesExoticLegacy"),
        LongRestHint: game.i18n.localize("DND5R.LongRestHintLegacy"),
        LongRestHintGroup: game.i18n.localize("DND5R.LongRestHintGroupLegacy"),
        TargetRadius: game.i18n.localize("DND5R.TargetRadiusLegacy"),
        TraitArmorPlural: foundry.utils.mergeObject(
          _fallback.DND5R?.TraitArmorLegacyPlural ?? {},
          translations.DND5R?.TraitArmorLegacyPlural ?? {},
          { inplace: false }
        ),
        TraitArmorProf: game.i18n.localize("DND5R.TraitArmorLegacyProf")
      }
    });
  }
  utils.performPreLocalization(CONFIG.DND5R);
  Object.values(CONFIG.DND5R.activityTypes).forEach(c => c.documentClass.localize());
});

/* -------------------------------------------- */
/*  Foundry VTT Ready                           */
/* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if ( ["Item", "ActiveEffect"].includes(data.type) ) {
      documents.macro.create5eMacro(data, slot);
      return false;
    }
  });

  // Register items by type
  dnd5r.registry.classes.initialize();

  // Chat message listeners
  documents.ChatMessage5e.activateListeners();

  // Bastion initialization
  game.dnd5r.bastion.initializeUI();

  // Determine whether a system migration is required and feasible
  if ( !game.user.isGM ) return;
  const cv = game.settings.get("dnd5r", "systemMigrationVersion") || game.world.flags.dnd5r?.version;
  const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
  if ( !cv && totalDocuments === 0 ) return game.settings.set("dnd5r", "systemMigrationVersion", game.system.version);
  if ( cv && !foundry.utils.isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) return;

  // Compendium pack folder migration.
  if ( foundry.utils.isNewerVersion("3.0.0", cv) ) {
    migrations.reparentCompendiums("DnD5r SRD Content", "D&D SRD Content");
  }

  // Perform the migration
  if ( cv && foundry.utils.isNewerVersion(game.system.flags.compatibleMigrationVersion, cv) ) {
    ui.notifications.error("MIGRATION.5eVersionTooOldWarning", {localize: true, permanent: true});
  }
  migrations.migrateWorld();
});

/* -------------------------------------------- */
/*  System Styling                              */
/* -------------------------------------------- */

Hooks.on("renderPause", (app, [html]) => {
  html.classList.add("dnd5r2");
  const img = html.querySelector("img");
  img.src = "systems/dnd5r/ui/official/ampersand.svg";
  img.className = "";
});

Hooks.on("renderSettings", (app, [html]) => {
  const details = html.querySelector("#game-details");
  const pip = details.querySelector(".system-info .update");
  details.querySelector(".system").remove();

  const heading = document.createElement("div");
  heading.classList.add("dnd5r2", "sidebar-heading");
  heading.innerHTML = `
    <h2>${game.i18n.localize("WORLD.GameSystem")}</h2>
    <ul class="links">
      <li>
        <a href="https://github.com/Codyddr99/foundrydnd5r/releases/latest" target="_blank">
          ${game.i18n.localize("DND5R.Notes")}
        </a>
      </li>
      <li>
        <a href="https://github.com/Codyddr99/foundrydnd5r/issues" target="_blank">${game.i18n.localize("DND5R.Issues")}</a>
      </li>
      <li>
        <a href="https://github.com/Codyddr99/foundrydnd5r/wiki" target="_blank">${game.i18n.localize("DND5R.Wiki")}</a>
      </li>
      <li>
        <a href="https://discord.com/channels/170995199584108546/670336046164213761" target="_blank">
          ${game.i18n.localize("DND5R.Discord")}
        </a>
      </li>
    </ul>
  `;
  details.insertAdjacentElement("afterend", heading);

  const badge = document.createElement("div");
  badge.classList.add("dnd5r2", "system-badge");
  badge.innerHTML = `
    <img src="systems/dnd5r/ui/official/dnd-badge-32.webp" data-tooltip="${dnd5r.title}" alt="${dnd5r.title}">
    <span class="system-info">${dnd5r.version}</span>
  `;
  if ( pip ) badge.querySelector(".system-info").insertAdjacentElement("beforeend", pip);
  heading.insertAdjacentElement("afterend", badge);
});

/* -------------------------------------------- */
/*  Other Hooks                                 */
/* -------------------------------------------- */

Hooks.on("renderChatPopout", documents.ChatMessage5e.onRenderChatPopout);
Hooks.on("getChatLogEntryContext", documents.ChatMessage5e.addChatMessageContextOptions);

Hooks.on("renderChatLog", (app, html, data) => {
  documents.Item5e.chatListeners(html);
  documents.ChatMessage5e.onRenderChatLog(html);
});
Hooks.on("renderChatPopout", (app, html, data) => documents.Item5e.chatListeners(html));

Hooks.on("chatMessage", (app, message, data) => applications.Award.chatMessage(message));

Hooks.on("renderActorDirectory", (app, html, data) => documents.Actor5e.onRenderActorDirectory(html));
Hooks.on("getActorDirectoryEntryContext", documents.Actor5e.addDirectoryContextOptions);

Hooks.on("renderCompendiumDirectory", (app, [html], data) => applications.CompendiumBrowser.injectSidebarButton(html));
Hooks.on("getCompendiumEntryContext", documents.Item5e.addCompendiumContextOptions);
Hooks.on("getItemDirectoryEntryContext", documents.Item5e.addDirectoryContextOptions);

Hooks.on("renderJournalPageSheet", applications.journal.JournalSheet5e.onRenderJournalPageSheet);

Hooks.on("targetToken", canvas.Token5e.onTargetToken);

// TODO: Generalize this logic and make it available in the re-designed transform application.
Hooks.on("dnd5r.transformActor", (subject, target, d, options) => {
  const isLegacy = game.settings.get("dnd5r", "rulesVersion") === "legacy";
  if ( (options.preset !== "wildshape") || !subject.classes?.druid || isLegacy ) return;
  let temp = subject.classes.druid.system.levels;
  if ( subject.classes.druid.subclass?.identifier === "moon" ) temp *= 3;
  d.system.attributes.hp.temp = temp;
});

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
  applications,
  canvas,
  dataModels,
  dice,
  documents,
  enrichers,
  Filter,
  migrations,
  registry,
  utils,
  DND5R
};
