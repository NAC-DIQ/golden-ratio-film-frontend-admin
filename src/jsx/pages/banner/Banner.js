import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import Loading from '../../components/Loading/Loading';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [file, setFile] = useState('');
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [banners, setBanners] = useState([]);
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
    // // add a image to data

    // axios
    try {
      let res = await axios.post(`${API_URL}banner`, data, header);
      // setBanners(res.data);
      setBanners([...banners, res.data]);
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
      const res = await axios.get(`${API_URL}banner`, header);
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
                          <th>Banner</th>
                          <th>Action</th>
                        </tr>
                        {banners.map(({ _id, image }) => (
                          <tr key={_id}>
                            <td>
                              <img
                                src={image}
                                alt=''
                                className='img img-rounded'
                                style={{
                                  width: '150px',
                                }}
                              />
                            </td>

                            <td>
                              <button
                                className='btn btn-primary'
                                style={{ backgroundColor: '#ff0000' }}
                                onClick={() => handleDelete(_id)}>
                                <span className='fa fa-trash'></span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e)}
                  encType='multipart/form-data'>
                  <div className='row'>
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
                          Add Banner
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

export default Banner;
