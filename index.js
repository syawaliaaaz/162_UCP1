const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// Support requests sent to /api/* by stripping the /api prefix and
// forwarding the request to the existing routes (e.g. /api/kandang -> /kandang).
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
        req.url = req.url.replace(/^\/api/, '');
    }
    next();
});

// ✅ CREATE (POST)
app.post('/kandang', async (req, res) => {
    try {
        const kandang = await db.Kandang.create(req.body);
        res.status(201).json({
            message: 'Kandang berhasil ditambahkan',
            data: kandang
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ READ ALL (GET)
app.get('/kandang', async (req, res) => {
    try {
        const semuaKandang = await db.Kandang.findAll();
        res.status(200).json(semuaKandang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ READ ONE (GET by ID)
app.get('/kandang/:id', async (req, res) => {
    try {
        const kandang = await db.Kandang.findByPk(req.params.id);
        if (!kandang) {
            return res.status(404).json({ message: 'Kandang tidak ditemukan' });
        }
        res.status(200).json(kandang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ UPDATE (PUT)
app.put('/kandang/:id', async (req, res) => {
    try {
        const [updated] = await db.Kandang.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedKandang = await db.Kandang.findByPk(req.params.id);
            return res.status(200).json({
                message: 'Kandang berhasil diupdate',
                data: updatedKandang
            });
        }
        return res.status(404).json({ message: 'Kandang tidak ditemukan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ DELETE
app.delete('/kandang/:id', async (req, res) => {
    try {
        const deleted = await db.Kandang.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            return res.status(200).json({ message: 'Kandang berhasil dihapus' });
        }
        return res.status(404).json({ message: 'Kandang tidak ditemukan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ START SERVER
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('✅ Server berjalan di port 3000');
    });
}).catch((err) => {
    console.error('❌ Koneksi database atau sinkronisasi gagal:', err);
});
