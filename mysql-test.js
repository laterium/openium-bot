/// @MySQL : mysql-test.js

const testsQueries = require('./mysql/testsQueries');

(async () => {
    try {
        const newTest = {
            test: 1,
            test2: 'value1',
            test3: 'value2',
            test4: '2025-02-01'
        };
        const insertResult = await testsQueries.insertTest(newTest);
        console.log('Inserted test with ID:', insertResult.insertId);

        const allTests = await testsQueries.getAllTests();
        console.log('All tests:', allTests);

        const testById = await testsQueries.getTestById(1);
        console.log('Test with ID 1:', testById);

        const updatedData = {
            test2: 'updatedValue1',
            test3: 'updatedValue2'
        };
        const updateResult = await testsQueries.updateTest(1, updatedData);
        console.log('Updated test:', updateResult.affectedRows);

        const deleteResult = await testsQueries.deleteTest(1);
        console.log('Deleted test:', deleteResult.affectedRows);
    } catch (error) {
        console.error('Error:', error);
    }
})();
