import useAdminPanelAuthors from "./hooks/useAdminPanelAuthors"
import Spin from 'components/spin'
import Table from "components/table"
import Content from "./content/Content"
import { DefaultMessage } from "components/Information"

const AdminPanelAuthors = () => {
  const {
    data,
    isLoading,
    columns,
    isError,
  } = useAdminPanelAuthors()

  if (isError) {
    return (
      <div>
        {DefaultMessage.error}
      </div>
    )
  }

  return (
    <div>
      <Content />
      <Spin loading={isLoading}>
        <Table
          data={data}
          columns={columns}
        />
      </Spin>
    </div>
  )
}

export default AdminPanelAuthors