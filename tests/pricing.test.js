const { calculateTotalPrice } = require('../services/pricingService');
const request = require('supertest');
const express = require('express');
const server = require('../server.js');

test('calculates total price correctly', () => {
  const pricing = {
    base_distance_in_km: 5,
    km_price: "1.5/1",
    fix_price: 10, 
  };

  const totalDistance = 12;
  const item_type="perishable";
  const totalPrice = calculateTotalPrice(item_type,pricing, totalDistance);

  expect(totalPrice).toBe(20.5);
});

describe('POST /organization/register', () => {
  afterAll(() => {
    server.close();
  });

  it('should register an organization', async () => {
    const response = await request(server)
      .post('/organization/register')
      .send({ name: 'Sample Organization' });

    expect(response.status).toBe(200);
    expect(response.body.organization).toBeDefined();
    expect(response.body.success).toBe(true);
  });
});


describe('POST /item/add', () => {
  it('should add an item', async () => {
    const response = await request(server)
      .post('/item/add')
      .send({ type: 'perishable', description: 'Sample description' });

    expect(response.status).toBe(200);
    expect(response.body.item).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const response = await request(server)
      .post('/item/add')
      .send({}); 

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Invalid item type');
  });
});


describe('POST /pricing/add', () => {
  it('should define pricing', async () => {
    const response = await request(server)
      .post('/pricing/add')
      .send({
        organization_id: 8,
        item_id: 7,
        zone: 'sampleZone',
        base_distance_in_km: 10,
        km_price: '1.5/1',
        fix_price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.pricing).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const response = await request(server)
      .post('/pricing/add')
      .send({}); 

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error Creating Pricing');
  });
});