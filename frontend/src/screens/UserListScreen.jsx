import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetUsersQuery, useDeleteUserMutation } from "../slices/usersApiSlice"
import { toast } from "react-toastify"


const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id)
        refetch()
        toast.success("User deleted successfully")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  };

  return (
    <>
        <h1>Users</h1>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{ color: "green" }} />
                                ) : (
                                    <FaTimes style={{ color: "red" }} />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>

                                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                    <FaTrash style={{ color: 'white' }} />
                                </Button>
                            </td>
                                
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UserListScreen