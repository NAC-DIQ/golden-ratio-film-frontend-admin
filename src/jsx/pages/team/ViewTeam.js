import React, { useState, useEffect } from 'react';
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

const ViewTeam = () => {
  const history = useHistory();
  const [teams, setTeam] = useState([]);
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
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const response = await axios.get(`${API_URL}team`);
    setTeam(response.data);
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
        await axios.delete(`${API_URL}team/${id}`, header);
        swal('Success', 'Team Deleted Successfully', 'success');
        setTeam(teams.filter((team) => team._id !== id));
      } catch (error) {
        swal('Error', 'Something Went Wrong', 'error');
      }
    }
  };
  const handleEdit = (id) => {
    history.push(`/team-edit/${id}`);
  };

  return (
    <>
      <PageTitle activeMenu='View' motherMenu='Team' pageContent='View Team' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>View Team</h4>
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
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Linkedin</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map(
                          ({
                            _id,
                            type,
                            name,
                            image,
                            designation,
                            createdAt,
                            linkedin,
                          }) => (
                            <tr key={_id}>
                              <td>
                                {type === '1'
                                  ? `Management`
                                  : type === '2'
                                  ? `Executives`
                                  : type === '3' && `Advisory Board`}
                              </td>
                              <td>
                                <img
                                  className='img-responsive img'
                                  width='55'
                                  height='55'
                                  src={image}
                                  alt=''
                                />
                              </td>
                              <td>{name}</td>
                              <td>{designation}</td>
                              <td>
                                {linkedin && (
                                  <a href={linkedin} target='_blank'>
                                    <span className='fab fa-linkedin fa-2x'></span>
                                  </a>
                                )}
                              </td>
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

export default ViewTeam;
