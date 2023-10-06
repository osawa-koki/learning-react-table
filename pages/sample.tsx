import React from 'react'
import { type Column, useTable, useSortBy } from 'react-table'
import { Table } from 'react-bootstrap'
import type User from '../src/@types/User'

const columns: Column[] = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: '名前',
    accessor: 'name'
  },
  {
    Header: 'メールアドレス',
    accessor: 'email'
  },
  {
    Header: '年齢',
    accessor: 'age'
  }
]

const data: User[] = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@example.com',
    age: 20
  },
  {
    id: 2,
    name: 'Alice',
    email: 'alice@example.com',
    age: 18
  },
  {
    id: 3,
    name: 'Tom',
    email: 'tom@example.com',
    age: 25
  }
]

export default function SampleTable (): React.JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    { columns, data },
    useSortBy
  )

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                {column.render('Header')}
                {' '}
                {
                  ((): string => {
                    const isSorted = column.isSorted
                    if (!isSorted) return ''
                    if (column.isSortedDesc == null) return ''
                    return ' ' + (column.isSortedDesc ? '🔽' : '🔼')
                  })()
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={cell.value}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
