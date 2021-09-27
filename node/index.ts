// Imports
// ========================================================
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { v4 as uuid, validate } from 'uuid';

// Config
// ========================================================
const DB_FILE = './data.json';
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const f = (value: any) => ({ data: value });

const e404 = 'NOT_FOUND';
const e403 = 'DUPLICATE';

// Endpoints
// ========================================================
app
  .get('/accounts', async (req, res) => {
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    return res.json(f(result.accounts));
  })
  .post('/accounts', async (req, res) => {
    const { address } = req.body;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    const find = result.accounts.find((i: any) => i?.id === address);
    const data = {
      id: address,
      email: null,
    };
    if (!find) {
      result.accounts.push(data);
      fs.writeFileSync(DB_FILE, JSON.stringify(result));
      return res.json(f(data));
    }
    return res.json(f(find));
  })
  .get('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    const find = result.accounts.find((i: any) => i?.id === id);
    if (!find) return res.status(404).json(f(e404));
    return res.json(f(find));
  });

app
  .get('/forums', async (req, res) => {
    const { id } = req.query;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    const findAll =
      result.forums.length === 0
        ? []
        : id
        ? result.forums.filter((i: any) => (i.accountId = id))
        : result.forums;
    return res.json(f(findAll));
  })
  .post('/forums', async (req, res) => {
    const { name, accountId } = req.body;
    const cleanName = `${name
      .replace(' ', '-')
      .replace("'", '')
      .replace('"', '')
      .replace(',', '')
      .replace(';', '')
      .replace(':', '')
      .replace('_', '')
      .toLowerCase()}`;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    const findDomain = result.forums.find((i: any) => i?.domain === cleanName);
    if (findDomain) return res.status(400).json(f(e403));

    const find = result.forums.find(
      (i: any) => i?.accountId === accountId && i?.name === name,
    );
    const data = {
      id: uuid(),
      name,
      accountId,
      domain: cleanName,
    };
    if (!find) {
      result.forums.push(data);
      fs.writeFileSync(DB_FILE, JSON.stringify(result));
      return res.json(f(data));
    }
    return res.json(f(find));
  })
  .get('/forums/:id', async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.query;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    if (validate(id)) {
      const find = result.forums.find((i: any) => {
        if (userId) {
          return i?.id === id && i?.accountId === userId;
        }
        return i?.id === id;
      });
      if (!find) return res.status(404).json(f(e404));
      return res.json(f(find));
    }
    const find = result.forums.find((i: any) => {
      if (userId) {
        return i?.domain === id && i?.accountId === userId;
      }
      return i?.domain === id;
    });
    if (!find) return res.status(404).json(f(e404));
    return res.json(f(find));
  })
  .get('/forums/:id/threads', async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.query;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    if (!validate(id)) return res.status(404).json(f(e404));
    const find = result.forums.find((i: any) => {
      if (userId) {
        return i?.id === id && i?.accountId === userId;
      }
      return i?.id === id;
    });
    if (!find) return res.status(404).json(f(e404));
    const threads =
      result.threads.length === 0
        ? []
        : result.threads.filter((i: any) => i.forumId === id);
    return res.json(f(threads));
  })
  .post('/forums/:id/threads', async (req, res) => {
    const { name, description, accountId } = req.body;
    const { id } = req.params;
    const result = JSON.parse(fs.readFileSync(DB_FILE).toString());
    const data = {
      id: uuid(),
      name,
      description,
      accountId,
      forumId: id,
    };

    result.threads.push(data);
    fs.writeFileSync(DB_FILE, JSON.stringify(result));
    return res.json(f(data));
  });

// Listen
// ========================================================
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
