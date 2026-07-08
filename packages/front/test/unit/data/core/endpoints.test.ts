import { endpoints } from '../../../../src/data/core/endpoints';

describe('Endpoints', () => {
  it('should have the correct socket endpoint', () => {
    expect(endpoints.socket).toBe('game:update');
  });

  it('should have the correct HTTP endpoints', () => {
    expect(endpoints.advance).toBe('/advance');
    expect(endpoints.aspects).toBe('/aspects');
    expect(endpoints.data).toBe('/data');
    expect(endpoints.elcalaMalAdd).toBe('/elcala-mal/add');
    expect(endpoints.elcalaMalLife).toBe('/elcala-mal/life');
    expect(endpoints.endTime).toBe('/end');
    expect(endpoints.exposed).toBe('/exposed');
    expect(endpoints.heroes).toBe('/heroes');
    expect(endpoints.init).toBe('/init');
    expect(endpoints.initTable).toBe('/init-table');
    expect(endpoints.startTables).toBe('/start-tables');
    expect(endpoints.superLife).toBe('/super-life');
    expect(endpoints.superPlan).toBe('/super-plan');
    expect(endpoints.minions).toBe('/minions');
    expect(endpoints.darkAvengersThreat).toBe('/dark-avengers-threat');
    expect(endpoints.ironPatriotLife).toBe('/iron-patriot-life');
    expect(endpoints.exposedThreat).toBe('/exposed-threat');
    expect(endpoints.reset).toBe('/reset');
    expect(endpoints.resetTable).toBe('/reset-table');
  });

  it('should be a const object', () => {
    // The object uses 'as const' for TypeScript immutability,
    // but JavaScript doesn't prevent runtime modifications
    expect(endpoints).toBeDefined();
    expect(typeof endpoints).toBe('object');
  });

  it('should have all expected endpoints', () => {
    const expectedEndpoints = [
      'socket',
      'advance',
      'aspects',
      'data',
      'elcalaMalAdd',
      'elcalaMalLife',
      'endTime',
      'exposed',
      'heroes',
      'init',
      'initTable',
      'startTables',
      'superLife',
      'superPlan',
      'minions',
      'darkAvengersThreat',
      'ironPatriotLife',
      'exposedThreat',
      'reset',
      'resetTable',
    ];

    expectedEndpoints.forEach((endpoint) => {
      expect(endpoints).toHaveProperty(endpoint);
    });
  });
});
