const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      select: {
        nama: true,
        hp_mahasiswa: true,
        status: true,
        kecamatan: true,
        kelurahan: true,
      }
    });
    return users;
  } catch (e) {
    console.log(e);
  }
}

const dataDashBoard = async () => {
  try {
    const data = await prisma.users.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })
    return data;
  } catch (e) {
    console.log(e);
  }
}

router.get('/', async (req, res) => {
  const data = await dataDashBoard();
  res.render('pages/dashboard', { data });
});

router.get('/list-users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.render('pages/list-users', { users });
  } catch (e) { 
    console.error('Error fetching users:', error);
  }
});

exports.router = router;
