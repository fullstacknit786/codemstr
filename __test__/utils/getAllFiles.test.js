import React from 'react'
import { getAllFiles } from '../../src/utils/getAllFiles';

it('should return a array', async () => {
    expect(await getAllFiles()).toStrictEqual([])
});

// it('should contain a object ', async () => {
//     const files = await getAllFiles()
//     if (files.length > 0)
//         expect(files[0]).toStrictEqual(Object)
// });