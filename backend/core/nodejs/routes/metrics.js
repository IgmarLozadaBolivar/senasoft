import express from 'express';
const router = express.Router();
import db from '../config/database.js';


router.get('/stats/centers', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT
                    d.name AS department,
                    c.name AS center,
                    COUNT(*) AS quantity
                FROM apprentices AS a
                         INNER JOIN centers AS c ON a.id_center_fk = c.id
                         INNER JOIN departments AS d ON c.id_department_fk = d.id
                GROUP BY d.name, c.name
                ORDER BY quantity DESC;
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

router.get('/stats/instructors/recommendations', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT
                    c.name AS center,
                    CONCAT(i.name, ' ', i.last_name) AS instructor,
                    COUNT(*) AS total_recommendations
                FROM apprentices a
                         JOIN centers c ON a.id_center_fk = c.id
                         JOIN recommendations r ON a.id = r.id_aprendiz_fk
                         JOIN instructors i ON r.id_instructor_fk = i.id
                GROUP BY c.name, instructor
                ORDER BY c.name, total_recommendations DESC;
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

router.get('/stats/centers/programs', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT
                    c.name AS center,
                    p.name AS program,
                    COUNT(a.id) AS quantity
                FROM apprentices a
                         JOIN programs p ON a.id_program_fk = p.id
                         JOIN centers c ON a.id_center_fk = c.id
                WHERE p.name IN (
                     'Análisis y Desarrollo de Software',
                     'Gestión de Proyectos de Software',
                     'Producción de Multimedia',
                     'Tecnología en Animación 3D'
                    )
                GROUP BY c.name, p.name
                ORDER BY c.name;
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

router.get('/stats/departments', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT
                    d.name AS department,
                    COUNT(a.id) AS quantity
                FROM apprentices a
                         JOIN centers c ON a.id_center_fk = c.id
                         JOIN departments d ON c.id_department_fk = d.id
                GROUP BY d.name
                ORDER BY quantity DESC;
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

router.get('/stats/github', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT 
                    COUNT(a.github_user) AS number_users
                FROM apprentices AS a
                WHERE a.github_user != '';
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

router.get('/stats/centers/level-english', async (req, res) => {
    try {
        const rows = await db.query(
            `
                SELECT 
                    centers.name AS training_center,
                    COUNT(*) AS number_of_apprentices
                FROM apprentices
                INNER JOIN centers ON centers.id = apprentices.id_center_fk
                WHERE apprentices.level_english IN ('B1', 'B2')
                GROUP BY centers.name
                ORDER BY number_of_apprentices DESC;
            `);

        res.status(200).json({
            success: true,
            message: "OK",
            data: rows
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar la cantidad de aprendices inscritos por centro.',
            error: e.message
        })
    }
});

export default router;