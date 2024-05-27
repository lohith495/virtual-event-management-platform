const request = require('supertest');
const express = require('express');

const app = require('../app'); 
var eventsArray = [];
describe('GET /events', () => {
  it('should get all events', async () => {
    const response = await request(app)
      .get('/events')
      .expect(200);
  });
});

describe('POST /events', () => {
  it('should create a new event with the provided body', async () => {
    const requestBody = {
      date : "30-05-2024",
      time : "1:45 PM IST",
      description : "Data Structures and Algorithms"
    };
    const response = await request(app)
      .post('/events')
      .send(requestBody)
      .expect(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      date : "30-05-2024",
      time : "1:45 PM IST",
      description : "Data Structures and Algorithms"
    }));
  });
  it('should return 400 bad request for the provided incorrect body', async () => {
    const requestBody = {
      id: 16,
      completed: true
    };
    const response = await request(app)
      .post('/events')
      .send(requestBody)
      .expect(400);
    });
});

describe('PUT /events/:id', () => {
  it('should update an event with the provided body', async () => {
    const requestBody = {
      date : "28-05-2024",
      time : "1:45 PM IST",
      description : "Backend Engineering I"
    };
    const response = await request(app)
      .put('/events/1')
      .send(requestBody)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      date : "28-05-2024",
      time : "1:45 PM IST",
      description : "Backend Engineering I"
    }));
  });
  it('should return 400 bad request for the provided incorrect body', async () => {
    const requestBody = {
      id: 15,
      completed: true
    };
    const response = await request(app)
      .put('/events/15')
      .send(requestBody)
      .expect(400);
    });
    it('should return 404 if the event id does not exist', async () => {
      const response = await request(app)
        .put('/events/999')
        .expect(404);
    });    
});

describe('DELETE /events/:id', () => {
  it('should delete an event when given a valid event id', async () => {
    const response = await request(app)
      .delete('/events/1')
      .expect(200);
    expect(response.text).toBe('Event 1 Deleted successfully');
  });

  it('should return 404 if the event id does not exist', async () => {
    const response = await request(app)
      .delete('/events/999')
      .expect(404);
  });
});
