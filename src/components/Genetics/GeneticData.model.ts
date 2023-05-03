export interface GeneticData {
  type: string;
  name: string;
  'gene-symbol': string;
  'text-list': any[];
  'inheritance-pattern-list': any[];
  'related-gene-list': any[];
  'synonym-list': any[];
  'db-key-list': any[];
  reviewed: string;
  published: string;
  'related-health-condition-list': any[];
}

export interface ChromosomeData {
  type: string;
  name: any;
  'ghr-page': any;
  'text-list': any;
  'related-health-condition-list': any;
  'db-key-list': any;
  reviewed: any;
  published: any;
}
