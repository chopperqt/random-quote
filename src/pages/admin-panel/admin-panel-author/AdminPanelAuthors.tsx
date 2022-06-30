import useAdminPanelAuthors from "../hooks/useAdminPanelAuthors"
import Spin from 'components/spin'
import Table from "components/table"


const AdminPanelAuthors = () => {
  const {
    data,
    isLoading,
    columns,
  } = useAdminPanelAuthors()

  return (
    <div>
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