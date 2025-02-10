import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown, GetProp, Menu, Table, TableProps } from "antd";
import { Button } from "@mui/material";
import image from "../../images/Events-amico-purpule.png";
import { DownOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import exportPDF from "../../service/importPdf";
import { PDF } from "../..//service/model/pdf";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";

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

const AdminPanel = ({ ...props }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });


  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
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

  //for get all data
  const onFetchAdmin = () => {
    axios
      // .create({
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // })
      .get(appUrl + `users/getAllUser`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.message);
      });
  };

  //to fetch data using useEffect , when everytime thise page is load
  useEffect(() => {
    setLoading(true);
    onFetchAdmin();
  }, []);

  //notification for success and error action
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
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

  const exportAll = () => {
    const visibleColumn = [
      {
        name: "Name",
        key: "fullName",
      },
      {
        name: "Email",
        key: "email",
      },
      {
        name: "Phone",
        key: "phone",
      },
      {
        name: "Country",
        key: "country",
      },
      {
        name: "City",
        key: "city",
      },
      {
        name: "Profession",
        key: "profession",
      },
    ];
    const pdfConfig: PDF = {
      fileName: "Grand Habesha Business Event",
      size: "A3",
      title: "List of Participant",
      orientation: "landscape",
      unit: "pt",
    };
    exportPDF({
      items: dataSource,
      visibleColumn: visibleColumn,
      pdfConfig: pdfConfig,
    });
  };

  const execl = dataSource;
  const Execlheaders = [
    {
      label: "label",
      key: "fulllabel",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Phone",
      key: "phone",
    },
    {
      label: "Country",
      key: "country",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "Profession",
      key: "profession",
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a onClick={exportAll}>PDF</a>,
        },
        {
          key: "2",
          label: (
            <CSVLink
              filename="Grand Habesha Business Event"
              title="List of Participant"
              data={execl}
              headers={Execlheaders}
            >
              Excel
            </CSVLink>
          ),
        },
      ]}
    />
  );
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
                    to="/forEvent/adminPanel"
                    className="nav-item"
                    onClick={toggleMenu}
                  >
                    Participant
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/forEvent/changePassword"
                    className="nav-item"
                    onClick={toggleMenu}
                  >
                    Change Password
                  </NavLink>
                </li>
                {localStorage.getItem("role") !== "Customer" && (
                  <li className="account">
                    <NavLink
                      to="/login"
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
          title={<h2>List of Participant</h2>}
          extra={
            <Dropdown
              overlay={menu}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button size="small" variant="contained">
                <div className="font-medium">Export</div>
                <DownOutlined
                  translate={undefined}
                  style={{ marginLeft: "2px" }}
                />
              </Button>
            </Dropdown>
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
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
              />
            </Card>
          </div>
        </Card>
      </section>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AdminPanel;
