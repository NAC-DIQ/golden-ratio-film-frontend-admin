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
import { Link, useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';

/// Image
import profile01 from '../../../images/profile/1.jpg';
import profile02 from '../../../images/profile/2.jpg';
import profile03 from '../../../images/profile/3.jpg';
import profile04 from '../../../images/profile/4.jpg';
import profile05 from '../../../images/profile/5.jpg';
import profile06 from '../../../images/profile/6.jpg';
import profile07 from '../../../images/profile/7.jpg';
import profile08 from '../../../images/profile/8.jpg';
import profile from '../../../images/profile/profile.png';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { move } from 'formik';

const ViewMovieDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const userDetails = localStorage.getItem('userDetails');
  const [movieProductions, setMovieProductions] = useState();
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
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const response = await axios.get(`${API_URL}movie/${id}`, header);
    setMovie(response.data);
    setIsLoaded(true);

    // set productions
    if (response.data?.production.length > 0) {
      let length = response.data?.production.length;
      // get a last index values of production and store it to movieProductions
      let lastIndex = response.data?.production[length - 1];
      setMovieProductions(lastIndex);
    } else {
      setMovieProductions(response.data.production);
    }
  };

  const [sendMessage, setSendMessage] = useState(false);

  const options = {
    settings: {
      overlayColor: '#000000',
    },
  };

  return (
    <>
      <div>
        <div>
          <PageTitle
            activeMenu='Movie Detail'
            motherMenu='Movies'
            pageContent='Movie Detail'
          />
          {isLoaded ? (
            <>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='profile card card-body px-3 pt-3 pb-0'>
                    <div className='profile-head'>
                      <div className='photo-content '>
                        <div
                          className='cover-photo rounded'
                          style={{
                            backgroundImage: `url(${movie.banner})`,
                          }}></div>
                      </div>
                      <div className='profile-info'>
                        <div className='profile-photo'>
                          <img
                            src={movie.image}
                            style={{ width: '88px', height: '88px' }}
                            className='img-fluid rounded-circle'
                            alt='profile'
                          />
                        </div>
                        <div className='profile-details'>
                          <div className='profile-name px-3 pt-2'>
                            <h4 className='text-primary mb-0'>
                              {movie?.title}
                            </h4>
                            <p>{movie?.genre}</p>
                          </div>
                          <div className='profile-email px-2 pt-2'>
                            <h4 className='text-muted mb-0'>
                              ({movie.category?.title})
                            </h4>
                            <p>Duration : {movieProductions?.run_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary'>
                            Trailer &amp; Synopsis
                          </h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-blog '>
                            <iframe
                              width='560'
                              height='315'
                              src={movie.trailer}
                              title='YouTube video player'
                              frameborder='0'
                              className='img-fluid  mb-4 w-100'
                              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                              allowfullscreen></iframe>

                            <p className='mb-0'>{movie.synopsis}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary '>Gallery</h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-interest '>
                            <SRLWrapper options={options}>
                              <div className='row sp4'>
                                {movie.gallery?.map((gal, index) => (
                                  <div className='col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1'>
                                    <a href={gal.url}>
                                      <img
                                        src={gal.url}
                                        alt='Gallery'
                                        className='img-fluid'
                                      />{' '}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </SRLWrapper>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary'>StarCast</h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-news'>
                            <div className='row'>
                              {movie.starcast?.map((cast, index) => (
                                <div
                                  className='media pt-3 pb-3 col-sm-6'
                                  key={index}
                                  style={{ alignItems: 'center' }}>
                                  <img
                                    src={cast?.cast?.image}
                                    alt=''
                                    className='me-3 rounded'
                                    style={{ width: '75px', height: '75px' }}
                                  />
                                  <div className='media-body'>
                                    <h5 className='m-b-5'>
                                      {cast?.cast?.name}
                                    </h5>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary'>Series Cast</h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-news'>
                            <div className='row'>
                              {movie.seriescast?.map((cast, index) => (
                                <div
                                  className='media  col-sm-4'
                                  key={index}
                                  style={{
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                  }}>
                                  <img
                                    src={cast?.cast?.image}
                                    alt=''
                                    className='rounded'
                                    style={{ width: '75px', height: '75px' }}
                                  />
                                  <div className='media-body'>
                                    <h5
                                      style={{
                                        marginBottom: 0,
                                        marginTop: 10,
                                      }}>
                                      {cast?.cast?.name}
                                    </h5>
                                    <p>{cast?.character}</p>
                                    <small>{cast?.season}</small>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary'>Production Details</h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-news'>
                            <div className='row'>
                              <div className='table-responsive'>
                                <table className='table table-bordered'>
                                  <tr>
                                    <th>Directed By</th>
                                    <td>{movieProductions?.directed_by}</td>
                                  </tr>
                                  <tr>
                                    <th>Written By</th>
                                    <td>{movieProductions?.written_by}</td>
                                  </tr>
                                  <tr>
                                    <th>Release Date</th>
                                    <td>{movieProductions?.release_date}</td>
                                  </tr>
                                  <tr>
                                    <th>Language</th>
                                    <td>{movieProductions?.language}</td>
                                  </tr>
                                  <tr>
                                    <th>Origin</th>
                                    <td>
                                      {movieProductions?.country_of_origin}
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='card'>
                        <div className='card-header border-0 pb-0'>
                          <h5 className='text-primary'>Other Infos</h5>
                        </div>
                        <div className='card-body pt-3'>
                          <div className='profile-news'>
                            <div className='row'>
                              <div className='table-responsive'>
                                <table className='table table-bordered'>
                                  <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Season</th>
                                  </tr>
                                  {movie.other?.map((ot, index) => (
                                    <tr key={index}>
                                      <td>
                                        {ot.type === '1'
                                          ? 'Producer'
                                          : ot.type === '2'
                                          ? 'Music'
                                          : ot.type === '3'
                                          ? 'Cinemotography'
                                          : ot.type === '4'
                                          ? 'Flim Edit'
                                          : 'Art Direction'}
                                      </td>
                                      <td>{ot?.name}</td>
                                      <td>{ot?.designation}</td>
                                      <td>{ot?.season}</td>
                                    </tr>
                                  ))}
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='row'>
              <div className='col-12'>
                <div className='card'>
                  <div className='card-body'>
                    <Loading />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewMovieDetail;
