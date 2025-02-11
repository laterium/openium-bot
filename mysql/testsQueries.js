/// @MySQL : testsQueries.js

const mMysql = require('../mysql');

module.exports = {
    /**
     * Retrieve all data from the `tests` table.
     * @returns {Promise<Array>} Array of test data.
     */
    getAllTests: async () => {
        return new Promise((resolve, reject) => {
            mMysql.query('SELECT * FROM tests', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    /**
     * Retrieve data from the `tests` table by `test` (ID).
     * @param {number} testId - The ID of the data to retrieve.
     * @returns {Promise<Object>} Data from the `tests` table.
     */
    getTestById: async (testId) => {
        return new Promise((resolve, reject) => {
            mMysql.query('SELECT * FROM tests WHERE test = ?', [testId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Return the first result (since ID is unique)
            });
        });
    },

    /**
     * Insert new data into the `tests` table.
     * @param {Object} testData - The data to insert.
     * @param {number} testData.test - Value for the `test` column.
     * @param {string} testData.test2 - Value for the `test2` column.
     * @param {string} testData.test3 - Value for the `test3` column.
     * @param {string} testData.test4 - Value for the `test4` column (format: YYYY-MM-DD).
     * @returns {Promise<Object>} The result of the INSERT query.
     */
    insertTest: async (testData) => {
        return new Promise((resolve, reject) => {
            mMysql.query('INSERT INTO tests SET ?', testData, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    /**
     * Update data in the `tests` table by `test` (ID).
     * @param {number} testId - The ID of the data to update.
     * @param {Object} testData - The new data to update.
     * @param {string} [testData.test2] - New value for the `test2` column (optional).
     * @param {string} [testData.test3] - New value for the `test3` column (optional).
     * @param {string} [testData.test4] - New value for the `test4` column (optional).
     * @returns {Promise<Object>} The result of the UPDATE query.
     */
    updateTest: async (testId, testData) => {
        return new Promise((resolve, reject) => {
            mMysql.query('UPDATE tests SET ? WHERE test = ?', [testData, testId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    /**
     * Delete data from the `tests` table by `test` (ID).
     * @param {number} testId - The ID of the data to delete.
     * @returns {Promise<Object>} The result of the DELETE query.
     */
    deleteTest: async (testId) => {
        return new Promise((resolve, reject) => {
            mMysql.query('DELETE FROM tests WHERE test = ?', [testId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};
