const command_en = require("./english/command.json");
const component_en = require("./english/component.json");
const system_en = require("./english/system.json");
const messages_en = require("./english/messages.json");

const command_el = require("./greek/command.json");
const component_el = require("./greek/component.json");
const system_el = require("./greek/system.json");
const messages_el = require("./greek/messages.json");

const command_es = require("./spanish/command.json");
const component_es = require("./spanish/component.json");
const system_es = require("./spanish/system.json");
const messages_es = require("./spanish/messages.json");

const command_zh = require("./chinese/command.json");
const component_zh = require("./chinese/component.json");
const system_zh = require("./chinese/system.json");
const messages_zh = require("./chinese/messages.json");

const command_ja = require("./japanese/command.json");
const component_ja = require("./japanese/component.json");
const system_ja = require("./japanese/system.json");
const messages_ja = require("./japanese/messages.json");

const command_ko = require("./korean/command.json");
const component_ko = require("./korean/component.json");
const system_ko = require("./korean/system.json");
const messages_ko = require("./korean/messages.json");

const command_pt = require("./portuguese/command.json");
const component_pt = require("./portuguese/component.json");
const system_pt = require("./portuguese/system.json");
const messages_pt = require("./portuguese/messages.json");

const resources = {
  en: {
    system: system_en,
    command: command_en,
    component: component_en,
    message: messages_en,
  },
  el: {
    system: system_el,
    command: command_el,
    component: component_el,
    message: messages_el,
  },
  es: {
    system: system_es,
    command: command_es,
    component: component_es,
    message: messages_es,
  },
  ko: {
    system: system_ko,
    command: command_ko,
    component: component_ko,
    message: messages_ko,
  },
  ja: {
    system: system_ja,
    command: command_ja,
    component: component_ja,
    message: messages_ja,
  },
  zh: {
    system: system_zh,
    command: command_zh,
    component: component_zh,
    message: messages_zh,
  },
  pt_br: {
    system: system_pt,
    command: command_pt,
    component: component_pt,
    message: messages_pt,
  },
};

module.exports = resources;
