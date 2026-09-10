/**
 * @license
 * Copyright (c) 2022 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {Validator} from 'jsonschema';
import * as fs from 'fs/promises';

const schema = JSON.parse(await fs.readFile('./schema.json', 'utf-8'));

test('Schema tests', async () => {
  // TODO: read multiple test files
  const example = JSON.parse(
    await fs.readFile('./examples/simple-element.json', 'utf-8')
  );
  const validator = new Validator();
  const result = validator.validate(example, schema);
  assert.is(result.errors.length, 0);
});

test('x-render-dependencies is generated for custom element declarations', () => {
  for (const declaration of [
    'CustomElementDeclaration',
    'CustomElementMixinDeclaration',
  ]) {
    const field =
      schema.definitions[declaration].properties['x-render-dependencies'];
    assert.is(field.type, 'array');
    assert.equal(field.items, {type: 'string'});
  }
});

test('Schema accepts an x-render-dependencies example', async () => {
  const example = JSON.parse(
    await fs.readFile('./examples/simple-element.json', 'utf-8')
  );
  example.modules[0].declarations[0]['x-render-dependencies'] = [
    'my-button',
    'my-icon',
  ];

  const validator = new Validator();
  const result = validator.validate(example, schema);
  assert.is(result.errors.length, 0);
});

test.run();
