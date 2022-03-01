const assert = require('assert');
const nock = require('nock');
const request = require('supertest');
const express = require('express');
const app = require('../server');
const promise_sort = require('./helper_sort');
const promise_direction = require('./helper_direction');

test('get posts that tech tag must present', async () => {
    const mockResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.13,"reads":50361,"tags":["tech","health"]},
      {"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.88,"reads":19645,"tags":["science","design","tech"]}
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockResponse);

    const res = await request(app).get('/api/posts?tags=tech');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResponse);
});

test('get posts that tech tag must present and sort it by popularity direction asc', async () => {
    const mockAPIResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]}
      ]
    };
    const mockResponse = {"posts":[
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockAPIResponse);

    const res = await request(app).get('/api/posts?tags=tech&sortBy=popularity');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResponse);
});

test('get posts that tech tag must present and sort it by id direction desc', async () => {
    const mockAPIResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":4,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]}
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockAPIResponse);

    const res = await request(app).get('/api/posts?tags=tech&sortBy=id&direction=desc');
    expect(res.status).toBe(200);

    expect(res.body.posts[0].id).toBe(4);
    expect(res.body.posts[1].id).toBe(3);
    expect(res.body.posts[2].id).toBe(1);

});

test('get posts that tech tag must present and sort it by popularity direction desc', async () => {
    const mockAPIResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":4,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]}
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockAPIResponse);

    const res = await request(app).get('/api/posts?tags=tech&sortBy=popularity&direction=desc');
    expect(res.status).toBe(200);

    expect(res.body.posts[0].id).toBe(1);
    expect(res.body.posts[1].id).toBe(4);
    expect(res.body.posts[2].id).toBe(3);

});


test('Send error message if tag is not present', async () => {
    const mockAPIResponse = {"error": "Tags parameter is required"};
    nock('https://api.hatchways.io')
      .get('/assessment/blog/posts?tag=tech')
      .replyWithError(400,mockAPIResponse);

    const res = await request(app).get('/api/posts?/tags=error');
    expect(res.status).toBe(400);
    expect(res.body).toEqual(mockAPIResponse);

});


test('Send error message if sortBy parameter is present but is not valid', async () => {
    const mockAPIResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":4,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]}
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockAPIResponse);

    promise_sort('/api/posts?/tags=tech&sortBy=error').catch(err => {
      expect(err).toEqual(Error({"error": "sortBy parameter is invalid"}));
    });

});

test('Send error message if sdirection parameter is present but is not valid', async () => {
    const mockAPIResponse = {"posts":[
      {"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.75,"reads":50361,"tags":["tech","health"]},
      {"author":"Elisha Friedman","authorId":8,"id":3,"likes":728,"popularity":0.13,"reads":19645,"tags":["science","design","tech"]},
      {"author":"Zackery Turner","authorId":12,"id":4,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]}
      ]
    };
    nock('https://api.hatchways.io')
        .get('/assessment/blog/posts?tag=tech')
        .reply(200, mockAPIResponse);

    promise_direction('/api/posts?/tags=tech&sdirection=error').catch(err => {
      expect(err).toEqual(Error({"error": "direction parameter is invalid"}));
    });

});
