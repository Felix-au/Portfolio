import React from 'react';
import { LoadingProjectModule } from './project-loading/LoadingProjectModule';
import { BgProjectModule } from './project-bg/BgProjectModule';
import { FutureProjectTemplate } from './future-project-template/FutureProjectTemplate';

export interface ProjectModule {
  id: string;
  title: string;
  sourceOrigin: string; // e.g. "loading" or "bg" or "future-project"
  badge: string;
  description: string;
  component: React.ComponentType;
}

/**
 * CENTRAL MODULE REGISTRY
 * To integrate any new project in the future:
 * 1. Create a new folder under `src/modules/project-name/`
 * 2. Export your component from that folder.
 * 3. Add an entry to this `activeProjects` array below.
 * That's it! The entire portfolio layout will automatically adapt.
 */
export const activeProjects: ProjectModule[] = [
  {
    id: 'loading-project',
    title: 'Splash Loader & UI Framework',
    sourceOrigin: 'loading/AzizStark-portfolio-v2',
    badge: 'Anime.js + Styled Components',
    description: 'Intro splash animation sequence with custom SVG scale transitions, flex layouts, and styled component UI cards.',
    component: LoadingProjectModule,
  },
  {
    id: 'bg-project',
    title: '3D WebGL & Motion Showcase',
    sourceOrigin: 'bg/portfolio-master',
    badge: 'Three.js + Framer Motion',
    description: 'Custom WebGL vertex & fragment shaders, dynamic displacement sphere background, and Katakana text decoding effects.',
    component: BgProjectModule,
  },
  {
    id: 'future-project-demo',
    title: 'Future Project Integration Slot',
    sourceOrigin: 'New External Project',
    badge: 'Plug & Play Architecture',
    description: 'Demonstrates how new projects introduced in the future can be seamlessly plugged into this site via the module registry.',
    component: FutureProjectTemplate,
  },
];
