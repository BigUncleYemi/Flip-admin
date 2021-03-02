import React, { useState } from "react";
import { Table } from "antd";
import { EmptyEntryWithTitle } from "./EmptyState";
import PropTypes from 'prop-types';

const DataTable = ({ fetchTrans, transaction, columns, title, data }) => {
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize:  transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize:  transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }))
    setLoading(false);
  }, [transaction])

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const fetch = async(params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction && transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{overflowX: 'auto', width: "100%"}}>
      {data && data.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title={title} />
      )}
    </div>
  );
};

DataTable.propTypes = {
  fetchTrans: PropTypes.func,
  transaction: PropTypes.object,
  columns: PropTypes.array,
  title: PropTypes.string
}

export default DataTable;