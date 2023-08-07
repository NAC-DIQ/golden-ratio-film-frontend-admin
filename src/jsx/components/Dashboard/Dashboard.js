import swal from '@sweetalert/with-react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { API_URL } from '../../../config';
import Loading from '../Loading/Loading';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${API_URL}dashboard`, header);
      console.log(res.data);
      setStatsData(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
      //   get the status error code
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
      <div className='row'>
        <div className='col-xl-12 mt-4'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='card'>
                <div className='card-body'>
                  {isLoaded ? (
                    <>
                      <div className='row shapreter-row mb-5'>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i className='fas fa-eye'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp end={statsData.userVisit} duration={2} />
                            </h3>
                            <span className='fs-14'>Visits</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i className='fas fa-newspaper'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp end={statsData.newsCount} duration={3} />
                            </h3>
                            <span className='fs-14'>News</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-hashtag'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp
                                end={statsData.socialCount}
                                duration={5}
                              />
                            </h3>
                            <span className='fs-14'>Social</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-image'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp
                                end={statsData.bannerCount}
                                duration={2}
                              />
                            </h3>
                            <span className='fs-14'>Banner</span>
                          </div>
                        </div>
                      </div>
                      <div className='row shapreter-row'>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-user'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp end={statsData.castCount} duration={3} />
                            </h3>
                            <span className='fs-14'>Cast</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-users'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp end={statsData.teamCount} duration={2} />
                            </h3>
                            <span className='fs-14'>Team</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-list'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp
                                end={statsData.categoryCount}
                                duration={2}
                              />
                            </h3>
                            <span className='fs-14'>Categories</span>
                          </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-sm-4 col-6'>
                          <div className='static-icon'>
                            <span>
                              <i class='fas fa-film'></i>
                            </span>
                            <h3 className='count'>
                              <CountUp
                                end={statsData.movieCount}
                                duration={3}
                              />
                            </h3>
                            <span className='fs-14'>Movies</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
            {isLoaded && (
              <div className='col-xl-6'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title'>Latest News</h4>
                    <div className='table-responsive'>
                      <table className='table table-hover mb-0'>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statsData.news.map((news, index) => (
                            <tr key={index}>
                              <td>{news.title}</td>
                              <td>
                                <img
                                  src={news.image}
                                  alt='news'
                                  width='50'
                                  height='50'
                                />
                              </td>
                              <td>{news.createdAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isLoaded && (
              <div className='col-xl-6'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title'>Latest Social</h4>
                    <div className='table-responsive'>
                      <table className='table table-hover mb-0'>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statsData.social.map((social, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  src={social.image}
                                  alt='social'
                                  width='50'
                                  height='50'
                                />
                              </td>
                              <td>{social.createdAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='col-xl-6'></div>
            <div className='col-xl-12'></div>
            <div className='col-xl-6'>
              <div className='row'>
                <div className='col-xl-12'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
