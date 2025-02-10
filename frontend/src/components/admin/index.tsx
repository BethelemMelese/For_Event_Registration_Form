import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, GetProp, Table, TableProps } from "antd";
import { Button } from "@mui/material";
import image from "../../images/Events-amico.png";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: string;
  gender: string;
  email: string;
  id: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    localStorage.removeItem("controller");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.reload();
  };

  //   identify the columns that has to display on the table
  const columns: any = [
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: true,
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: true,
    },
    {
      title: "Profession",
      dataIndex: "profession",
      sorter: true,
    },
  ];

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const dataSourceMoke = [
    {
      id: 1,
      fullName: "Bethelem Melese",
      email: "melesebety2673@gmail.com",
      phone: "0934341010",
      country: "Ethiopia",
      city: "Addis Ababa",
      profession: "Software Developer",
    },
    {
      id: 2,
      fullName: "Bethelem Melese",
      email: "melesebety2673@gmail.com",
      phone: "0934341010",
      country: "Ethiopia",
      city: "Addis Ababa",
      profession: "Software Developer",
    },
    {
      id: 3,
      fullName: "Bethelem Melese",
      email: "melesebety2673@gmail.com",
      phone: "0934341010",
      country: "Ethiopia",
      city: "Addis Ababa",
      profession: "Software Developer",
    },
    {
      id: 4,
      fullName: "Bethelem Melese",
      email: "melesebety2673@gmail.com",
      phone: "0934341010",
      country: "Ethiopia",
      city: "Addis Ababa",
      profession: "Software Developer",
    },
    {
      id: 5,
      fullName: "Bethelem Melese",
      email: "melesebety2673@gmail.com",
      phone: "0934341010",
      country: "Ethiopia",
      city: "Addis Ababa",
      profession: "Software Developer",
    },
  ];
  return (
    <div className="app_container">
      <section className="header-section">
        <div className="header-content">
          <div className="header-title">
            <h2>Grand Habesha Business Event</h2>
            <p>
              Expand your network and grow your business with industry leaders.
            </p>
          </div>
          <div className="header-image">
            <img src={image} alt="Business Event" />
          </div>
        </div>
        <div className="navbar-content">
          <div className="nav-bar">
            <nav className="main-nav-menu">
              <ul className={`nav-item-menu ${isOpen ? "open" : ""}`}>
                <li>
                  <NavLink
                    to="adminPanel"
                    className="nav-item"
                    onClick={toggleMenu}
                  >
                    Visitors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="adminPanel"
                    className="nav-item"
                    onClick={toggleMenu}
                  >
                    Speakers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="adminPanel"
                    className="nav-item"
                    onClick={toggleMenu}
                  >
                    Change Password
                  </NavLink>
                </li>
                {localStorage.getItem("role") !== "Customer" && (
                  <li className="account">
                    <NavLink
                      to="/register"
                      className="nav-item account"
                      onClick={onLogout}
                      style={{ color: "#ff7f16" }}
                    >
                      LogOut
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="main-section">
        <Card
          title={<h2>List of registered Visitors</h2>}
          extra={
            <Button variant="outlined" color="success">
              Export
            </Button>
          }
          className="main-content"
        >
          <div className="list_data">
            <Card>
              <Table
                className="table-list"
                size="small"
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={dataSourceMoke}
                pagination={tableParams.pagination}
                loading={loading}
                // onChange={handleTableChange}
              />
            </Card>
          </div>
        </Card>
      </section>

    </div>
  );
};

export default AdminPanel;
