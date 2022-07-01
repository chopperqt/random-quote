import useAdminPanelAuthors from "../hooks/useAdminPanelAuthors"
import Spin from 'components/spin'
import Table from "components/table"
import Content from "./content/Content"

const AdminPanelAuthors = () => {
  const {
    data,
    isLoading,
    columns,
  } = useAdminPanelAuthors()

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