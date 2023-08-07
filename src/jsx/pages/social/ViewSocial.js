import React, { useState, useRef, useEffect } from 'react';
import PageTitle from '../../layouts/PageTitle';
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import axios from 'axios';
import { API_URL } from '../../../config';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';

const ViewSocial = () => {
  const history = useHistory();
  const [social, setSocial] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const userDetails = localStorage.getItem('userDetails');
  const user = JSON.parse(userDetails);
  const token = user.token;
  const header = {
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  };
  // use effect
  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    const response = await axios.get(`${API_URL}social`);
    setSocial(response.data);
    setIsLoaded(true);
    $('#example').DataTable();
  };
  const handleDelete = async (id) => {
    const result = await swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    if (result) {
      try {
        await axios.delete(`${API_URL}social/${id}`, header);
        swal('Success', 'Social Deleted Successfully', 'success');
        setSocial(social.filter((soc) => soc._id !== id));
      } catch (error) {
        const { status } = error.response;

        swal('Error', 'Something Went Wrong', 'error');
        if (status === 401) {
          localStorage.removeItem('userDetails');
          window.location.reload();
        }
      }
    }
  };
  const handleEdit = (id) => {
    history.push(`/social-edit/${id}`);
  };

  return (
    <>
      <PageTitle
        activeMenu='View'
        motherMenu='Social'
        pageContent='View Social'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>View Social</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <div id='job_data' className='dataTables_wrapper'>
                  {isLoaded ? (
                    <table id='example' className='display'>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Image</th>
                          <th>Url</th>
                          <th>Created By</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {social.map(
                          ({ _id, type, url, image, createdAt, createdBy }) => (
                            <tr key={_id}>
                              <td>{type}</td>
                              <td>
                                <img
                                  className='img-responsive img'
                                  width='55'
                                  height='55'
                                  src={image}
                                  alt=''
                                />
                              </td>
                              <td>
                                <Link to={url}>{url}</Link>
                              </td>
                              <td>{createdBy?.name}</td>
                              <td>{createdAt}</td>
                              <td>
                                <span
                                  className='btn btn-dark shadow btn-xs sharp me-1'
                                  onClick={() => handleEdit(_id)}>
                                  <i className='fa fa-pen'></i>
                                </span>
                                <span
                                  className='btn btn-danger shadow btn-xs sharp'
                                  onClick={() => handleDelete(_id)}>
                                  <i className='fa fa-trash'></i>
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSocial;
