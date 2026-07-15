import {
  advantageContent,
  capabilityCards,
  environmentsContent,
  heroContent,
  howItWorksContent,
  workflowSteps,
} from './home'
import { footerAudience, footerEmail } from './footer'
import { CALENDLY_SCHEDULE_URL, LINKEDIN_COMPANY_URL, SCHEDULE_CALL_LABEL } from '../constants/links'

export const CLI_SYSTEM = {
  name: 'WEDECODE_OS',
  version: 'v1.0.0',
  node: 'rlaas.core',
  auth: 'GUEST_ACCESS_GRANTED',
  prompt: 'wedecode@rlaas',
  cwd: '~',
}

export const BRAND_TITLE = 'WEDECODE'
export const BRAND_TAGLINE = 'RL as a Service'

export const CLI_MODULES = [
  { id: 'home', label: '01._HOME', command: 'home' },
  { id: 'advantage', label: '02._ADVANTAGE', command: 'advantage' },
  { id: 'workflow', label: '03._WORKFLOW', command: 'workflow' },
  { id: 'environments', label: '04._ENVIRONMENTS', command: 'environments' },
  { id: 'contact', label: '05._CONTACT', command: 'contact' },
]

export const COMMAND_HELP = [
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'clear', desc: 'Clear terminal output' },
  { cmd: 'whoami', desc: 'About WeDecode and our mission' },
  { cmd: 'ls', desc: 'List readable content files' },
  { cmd: 'cat <file>', desc: 'Read a file (hero.txt, advantage.txt, workflow.txt, environments.txt, status.txt)' },
  { cmd: 'home | advantage | workflow | environments | contact', desc: 'Jump to a module' },
  { cmd: '1-5', desc: 'Quick module switch (same as module commands)' },
  { cmd: 'schedule', desc: 'Open scheduling link for a call' },
  { cmd: 'email', desc: 'Show contact email' },
]

export const CLI_FILES = [
  'hero.txt',
  'advantage.txt',
  'workflow.txt',
  'environments.txt',
  'status.txt',
]

export function getModuleContent(moduleId) {
  switch (moduleId) {
    case 'home':
      return {
        title: heroContent.title,
        lines: [
          `> ${heroContent.eyebrow}`,
          '',
          heroContent.description,
          '',
          `"${heroContent.trustText.replace(/^"|"$/g, '')}"`,
          '',
          'TIP: type `cat workflow.txt` or press [3] to inspect the RLaaS pipeline.',
        ],
      }
    case 'advantage':
      return {
        title: advantageContent.title,
        lines: [
          `> ${advantageContent.eyebrow}`,
          '',
          advantageContent.subtitle,
          '',
          advantageContent.description,
          '',
          'COMPARISON_MATRIX:',
          '  industry_standard :: sparse rewards, synthetic proxies, stochastic feedback',
          '  wedecode         :: dense reward architecture, human baselines, deterministic evals',
        ],
      }
    case 'workflow':
      return {
        title: howItWorksContent.title,
        lines: [
          `> ${howItWorksContent.eyebrow}`,
          '',
          howItWorksContent.subtitle,
          '',
          ...workflowSteps.flatMap((step, index) => [
            `[${index + 1}] ${step.name.toUpperCase()}`,
            `    WHAT_HAPPENS : ${step.whatHappens}`,
            `    WHAT_YOU_GET : ${step.result}`,
            '',
          ]),
        ],
      }
    case 'environments':
      return {
        title: environmentsContent.title,
        lines: [
          `> ${environmentsContent.eyebrow}`,
          '',
          environmentsContent.subtitle,
          '',
          ...capabilityCards.flatMap((card) => [
            `[${card.title.toUpperCase()}]`,
            `  summary : ${card.summary}`,
            `  detail  : ${card.details}`,
            '',
          ]),
        ],
      }
    case 'contact':
      return {
        title: 'Contact & Partnership',
        lines: [
          footerAudience,
          '',
          `EMAIL    : ${footerEmail}`,
          `SCHEDULE : ${SCHEDULE_CALL_LABEL} → type \`schedule\``,
          `LINKEDIN : ${LINKEDIN_COMPANY_URL}`,
          '',
          'AUDIENCE : AI labs · agent startups · research teams',
          'SLA      : every inquiry reviewed within 48 hours',
        ],
      }
    default:
      return { title: 'Unknown module', lines: ['Module not found.'] }
  }
}

export function getFileContent(filename) {
  const normalized = filename.toLowerCase().replace(/^\.\//, '')

  switch (normalized) {
    case 'hero.txt':
      return getModuleContent('home').lines.join('\n')
    case 'advantage.txt':
      return getModuleContent('advantage').lines.join('\n')
    case 'workflow.txt':
      return getModuleContent('workflow').lines.join('\n')
    case 'environments.txt':
      return getModuleContent('environments').lines.join('\n')
    case 'status.txt':
      return [
        'LOCATION : Remote-first · serving frontier AI teams globally',
        'FOCUS    : RLaaS · SFT data · post-training infrastructure',
        'MODALITY : Tool use · coding · image · voice · computer use',
        'DOMAIN   : Healthcare · Finance · Banking · enterprise workflows',
        `CONTACT  : ${footerEmail}`,
        `BOOK     : ${CALENDLY_SCHEDULE_URL}`,
      ].join('\n')
    default:
      return null
  }
}

export function getWhoamiText() {
  return [
    'WeDecode — RL Built for the Frontier.',
    '',
    'We supply SFT data and provide RL as a Service with out-of-the-box',
    'environments, tasks, and infrastructure for post-training teams.',
    '',
    'Built for researchers, ML engineers, and startup teams shipping agents',
    'who need deterministic evaluation — not noisy synthetic proxies.',
  ].join('\n')
}

export function getHelpText() {
  return [
    'AVAILABLE COMMANDS',
    '──────────────────',
    ...COMMAND_HELP.map(({ cmd, desc }) => `  ${cmd.padEnd(28)} ${desc}`),
    '',
    'MODULES (also use ↑↓ + ENTER)',
    '──────────────────────────────',
    ...CLI_MODULES.map((m) => `  ${m.label.padEnd(20)} → ${m.command}`),
  ].join('\n')
}
