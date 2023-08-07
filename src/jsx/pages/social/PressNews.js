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
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';

const PressNews = () => {
  const history = useHistory();
  const [newses, setNews] = useState([]);
  const [orderedNews, setOrderedNews] = useState([]);
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
    fetchNews();
    fetchOrderedNews();
  }, []);

  const fetchNews = async () => {
    const response = await axios.get(`${API_URL}news`);
    setNews(response.data);
  };
  const fetchOrderedNews = async () => {
    const response = await axios.get(`${API_URL}news/update/press`);
    setOrderedNews(response.data);
    console.log(response.data);
    setIsLoaded(true);
    $('#example').DataTable();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get a checkbox multi checked value
    const checkbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkboxValues = Array.from(checkbox).map((c) => c.value);
    if (checkboxValues.length < 2) {
      swal('Please select any 3 checkbox', '', 'error');
    }

    try {
      await axios.post(
        `${API_URL}news/update/press`,
        {
          newsIds: checkboxValues,
        },
        header
      );
      swal('Success', 'News Order Updated Successfully', 'success');
      history.push('/news-view');
    } catch (error) {
      const { status } = error.response;

      swal('Error', 'Something Went Wrong', 'error');
      if (status === 401) {
        localStorage.removeItem('userDetails');
        window.location.reload();
      }
    }
  };

  return (
    <>
      <PageTitle activeMenu='View' motherMenu='News' pageContent='View News' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>View News</h4>
            </div>
            {isLoaded && (
              <div className='card-body'>
                <div className='row'>
                  {orderedNews.map(
                    (news, index) =>
                      index < 3 && (
                        <div className='col-sm-4' key={news._id}>
                          <div className='card'>
                            <div className='card-body'>
                              <img
                                src={news.image}
                                alt=''
                                style={{ width: '100%', borderRadius: '5px' }}
                              />
                              <p>{news.title}</p>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            <div className='card-body'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='table-responsive'>
                  <div id='job_data' className='dataTables_wrapper'>
                    {isLoaded ? (
                      <table id='example' className='display'>
                        <thead>
                          <tr>
                            <th>Select </th>
                            <th style={{ width: '60px' }}>News Thumbnail</th>
                            <th>News Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newses.map(
                            ({
                              _id,
                              type,
                              title,
                              image,
                              category,
                              createdAt,
                              createdBy,
                            }) => (
                              <tr key={_id}>
                                <td>
                                  <input
                                    type='checkbox'
                                    name='selected'
                                    value={_id}
                                  />
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
                                <td>{title}</td>
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
                <button className='btn btn-xs btn-dark'>
                  Set this as Press Release news
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PressNews;
