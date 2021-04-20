/* eslint-disable jest/no-identical-title */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render} from '@testing-library/react';
import CreateData from './CreateData';
import { prettyDOM } from '@testing-library/react'

test('renders content',() => {
  const createNotes= {
    content:'Component testing is done with react-testing-library',
  }
  const component = render(
    <CreateData createNotes={createNotes}/>
  )
  expect(component.container).toBeInTheDocument(
    'Component testing is done with react-testing-library'
  )
});

//Se puede afirmar que un elemento esta en el texto del documento o no.
test('renders content',() => {
  const setUpdate= {
    content:'Component testing is done with react-testing-library',
  }
  const component = render(
    <CreateData setUpdate={setUpdate}/>
  )
  expect(component.container).toBeInTheDocument(
    'Component testing is done with react-testing-library'
  )
});

//encontrar el elemento HTML donde se imprime la nota, y pedir que la muestre en la consola.
test('renders content', () => {
  const createNotes = {
    content: 'Component testing is done with react-testing-library',
  }
  const component = render(
    <CreateData createNotes ={createNotes} />
  )
  const inputNote = component.container.querySelector('.inputNote')

  console.log(prettyDOM(inputNote))
});

test('renders content', () => {
  const createNotes = {
    content: 'Component testing is done with react-testing-library',
  }
  const component = render(
    <CreateData createNotes ={createNotes} />
  )
  const printedNote = component.container.querySelector('.printedNote')

  console.log(prettyDOM(printedNote))
});

