import Prisma from "../src/db";
import { server } from "../src/server"

beforeEach(() => {
});

afterEach(async () => {
  // Remove all data in db so every test works off a consistently clean db
  await Prisma.$transaction([
    Prisma.entry.deleteMany()
  ]);
});

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("card api endpoints", () => {
  // Test Create
  it("create a todo card", async() => {
    // Dummy data
    const data = {
      "id": "1",
      "title": "test title",
      "description": "test description",
      "created_at": new Date(),
    };

    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: data,
    });

    // Test OK Response
    expect(response.statusCode).toEqual(200);

    // Check data is added to db
    const entry = await Prisma.entry.findFirst({
      where: {id: data.id}
    });
    expect(entry).toEqual(data);
  })

  // Test Get All
  it("get all todo cards", async() => {
    const data = {
      "title": "Walk the dog",
      "description": "Take the dog out for a walk in the park.",
      "created_at": new Date()
    };

    // Insert 3 entries into db
    await Prisma.entry.create({data: data});
    await Prisma.entry.create({data: data});
    await Prisma.entry.create({data: data});

    const response = await server.inject({
      method: 'GET',
      url: '/get/'
    });

    // Test OK Response
    expect(response.statusCode).toEqual(200);

    // Check there are strictly 3 entries
    expect(response.json()).toHaveLength(3);
  });

  // Test Get Specific Card
  it("get a todo card", async() => {
    // Dummy data
    const data = {
      "id": "1",
      "title": "test title",
      "description": "test description",
      // Converted to string to easily match expected output
      "created_at": new Date().toISOString(),
    };

    await Prisma.entry.create({data: data});

    const response = await server.inject({
      method: 'GET',
      url: '/get/' + data.id,
      payload: data,
    });

    // Test OK Response
    expect(response.statusCode).toEqual(200);

    // Check fetched data
    expect(response.json()[0]).toEqual(data);
  });

  // Test Delete
  it("delete a todo card", async() => {
    const data = {
      "id": "1",
      "title": "Walk the dog",
      "description": "Take the dog out for a walk in the park.",
      "created_at": new Date()
    };

    // Insert data into db
    const entry = await Prisma.entry.create({data: data});

    // Double check data entry was successful
    expect(entry).toEqual(data);

    // Delete data via API
    const response = await server.inject({
      method: 'DELETE',
      url: '/delete/' + data.id,
    });

    // Test OK Response
    expect(response.statusCode).toEqual(200);

    // Check data was deleted in db
    const entry2 = await Prisma.entry.findFirst({
      where: {id: data.id}
    });
    expect(entry2).toBeNull();
  });

  // Test Update
  it("update a todo card", async() => {
    const data = {
      "id": "1",
      "title": "Walk the dog",
      "description": "Take the dog out for a walk in the park.",
      "created_at": new Date()
    };

    // Insert data into db
    const entry = await Prisma.entry.create({data: data});

    // Double check data entry was successful
    expect(entry).toEqual(data);

    // Update data via API
    const new_data = {
      "title": "Feed the cat",
      "description": "Refresh the cat's food bowl"
    }

    const response = await server.inject({
      method: 'PUT',
      url: '/update/' + data.id,
      payload: new_data
    });

    // Test OK Response
    expect(response.statusCode).toEqual(200);

    // Check data was updated in db
    const entry2 = await Prisma.entry.findFirst({
      where: {id: data.id}
    });

    const updated_data = {
      "id": data.id,
      "title": new_data.title,
      "description": new_data.description,
      "created_at": data.created_at
    }

    expect(entry2).toEqual(updated_data);
  });
});