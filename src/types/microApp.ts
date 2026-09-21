import React from 'react';

export type IntegrationType = 'iframe' | 'component';

export interface GeoAIMicroAppManifest {
  appId: string;
  displayName: string;
  version: string;
  routePrefix: string;
  integrationType: IntegrationType;
  entryUrl: string;
  authRequired: boolean;
  capabilities: string[];
  englishName: string;
  description: [string, string] | string[];
  detailDescription: string;
  iconName: string;
  color: string;
  bgColor: string;
  lightBgColor: string;
  textColor: string;
  borderColor: string;
  badge: string;
  entryComponent?: React.ComponentType<{ onNavigate: (route: string) => void }>;
}
