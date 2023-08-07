import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import Loading from '../../components/Loading/Loading';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const AboutBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [file, setFile] = useState('');
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [banners, setBanners] = useState([]);
  const [type, setType] = useState('image');
  // get token from localstorage
  const userDetails = localStorage.getItem('userDetails');
  const user = JSON.parse(userDetails);
  const token = user.token;
  const header = {
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  };

  const handleFile = (e, type) => {
    let file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // form data with image
    const data = new FormData();

    data.append('image', file);
    data.append('type', type);
    // // add a image to data

    // axios
    try {
      let res = await axios.post(`${API_URL}banner/about`, data, header);
      // setBanners(res.data);
      console.log(res.data);
      setBanners(res.data);
      setFile('');
      swal('Success', 'Banner added successfully', 'success');
      // reset the form using query selector
      document.querySelector('form').reset();
      setSubmitting(false);
    } catch (error) {
      const { status } = error.response;

      swal('Error', 'Something Went Wrong', 'error');
      if (status === 401) {
        localStorage.removeItem('userDetails');
        window.location.reload();
      }
    }
  };
  const handleDelete = async (id) => {
    // prompt for confirming delete
    const result = await swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (result) {
      try {
        const res = await axios.delete(`${API_URL}banner/${id}`, header);
        const newBanner = banners.filter((banner) => banner._id !== id);
        setBanners(newBanner);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);
  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${API_URL}banner/about`, header);
      setBanners(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle
        activeMenu='Manage'
        motherMenu='Banner'
        pageContent='Manage Banner'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Manage Banners</h4>
            </div>
            {isLoaded ? (
              <div className='card-body'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='table responsive'>
                      <table className='table'>
                        <tr>
                          <th>Type</th>
                          <th>Banner</th>
                        </tr>
                        <tr>
                          <td>{banners.type}</td>
                          <td>
                            {banners.type === 'image' && (
                              <img
                                src={banners.image}
                                alt=''
                                className='img img-rounded'
                                style={{
                                  width: '150px',
                                }}
                              />
                            )}
                            {banners.type === 'video' && (
                              <>
                                <video width='150' height='150' controls>
                                  <source
                                    src={banners.image}
                                    type='video/mp4'
                                  />
                                  Your browser does not support HTML5 video.
                                </video>
                              </>
                            )}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e)}
                  encType='multipart/form-data'>
                  <div className='row'>
                    <div className='form-group col-md-3 mb-3'>
                      <label htmlFor=''>Type</label>
                      <br />
                      <br />
                      <br />
                      <div className='from-file'>
                        <select
                          className=' form-control'
                          name='type'
                          required
                          onChange={(e) => setType(e.target.value)}>
                          <option value='image'>image</option>
                          <option value='video'>video</option>
                        </select>
                      </div>
                    </div>
                    <div className='form-group col-md-3 mb-3'>
                      <label htmlFor=''>
                        Image
                        <small className='d-inline-block m-3'>
                          Recommended Size (WxH) : {ImageSize.mainBanner}
                        </small>
                      </label>
                      <div className='from-file'>
                        <input
                          type='file'
                          className='form-file-input form-control'
                          placeholder='Thumbnail'
                          name='thumbnail'
                          accept='image/*'
                          required
                          onChange={(e) => handleFile(e, 'thumbnail')}
                        />
                      </div>
                    </div>

                    <div
                      className='form-col-md-3 mt-3 d-flex '
                      style={{ justifyContent: 'space-between' }}>
                      {submitting ? (
                        <LoadingButton />
                      ) : (
                        <button type='submit' className='btn btn-primary'>
                          Change Banner
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBanner;
