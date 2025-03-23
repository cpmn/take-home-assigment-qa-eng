import { Table, Text } from '@mantine/core'
import { IconPlus, IconQuestionMark, IconCheck } from '@tabler/icons-react'
import { IFormData, Status } from '@/utils/types'
import { NewModalView } from './new-query-modal'
import { ExistingQueryModal } from './existing-query-modal'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import classes from '../styling/table-view.module.css'

interface DataTableProps {
  formData: IFormData[]
  isLoading: boolean
  handleUpdates: () => void
}

export const TableView: React.FC<DataTableProps> = ({
  formData,
  isLoading,
  handleUpdates,
}) => {
  const [selectedRow, setSelectedRow] = useState<IFormData | null>(null) 
  const [opened, { open, close }] = useDisclosure(false) 

  const handleOpenModal = (rowData: IFormData) => {
    setSelectedRow(rowData)
    open() 
  }

  const getQueryStatus = (status: Status | undefined, rowData: IFormData) => {
    if (!status) {
      return (
        <IconPlus
          size={20}
          color="blue"
          style={{ cursor: 'pointer' }}
          title="Add Query"
          onClick={() => handleOpenModal(rowData)} 
          data-testid="add-query-icon"
        />
      )
    }
    if (status === Status.OPEN) {
      return (
        <IconQuestionMark
          size={20}
          color="red"
          style={{ cursor: 'pointer' }}
          title="Open Query"
          onClick={() => handleOpenModal(rowData)} 
          data-testid="open-query-icon"
        />
      )
    } else {
      return (
        <IconCheck
          size={20}
          color="green"
          style={{ cursor: 'pointer' }}
          title="Resolved Query"
          onClick={() => handleOpenModal(rowData)}
          data-testid="resolved-query-icon"
        />
      )
    }
  }

  const renderModal = () => {
    if (selectedRow?.query) {
      return (
        <ExistingQueryModal
          opened={opened}
          onClose={close}
          data={selectedRow.query} 
          onUpdate={handleUpdates}
          data-testid="existing-query-modal"
        />
      )
    } else {
      // no query
      if (selectedRow) {
        return (
          <NewModalView
            opened={opened}
            onClose={close}
            data={selectedRow}
            onUpdate={handleUpdates}
            data-testid="new-query-modal"
          />
        )
      }
    }
  }

  const rows = formData.map((data, index) => (
    <Table.Tr key={index} data-testid={`table-row-${index}`}>
      <Table.Td data-testid={`question-${index}`}>{data.question}</Table.Td>
      <Table.Td data-testid={`answer-${index}`}>{data.answer}</Table.Td>
      <Table.Td className={classes.querystatus} visibleFrom="md" data-testid={`query-status-${index}`}>
        {getQueryStatus(data.query?.status, data)}
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className={classes.wrapper} data-testid="table-view-wrapper">
      {isLoading ? (
        <p data-testid="loading-text">Loading...</p>
      ) : (
        <>
          <Text size="lg" data-testid="app-title">Query Management Application</Text>
          <Table
            className={classes.table}
            highlightOnHover={true}
            withTableBorder
            verticalSpacing="sm"
            data-testid="query-table"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th data-testid="table-header-question">Question</Table.Th>
                <Table.Th data-testid="table-header-answer">Answer</Table.Th>
                <Table.Th data-testid="table-header-queries">Queries</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {renderModal()}
        </>
      )}
    </div>
  )
}
