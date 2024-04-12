import { Checkbox, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { CustomInput, PrimaryButton } from '../../Components/Customs';
import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { api } from '../../Components/Apis';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Colors } from '../../Components/Colors';

const CreateStaffpage = () => {
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName.length === 0 || address === 0 || email === 0 || phoneNumber === 0 || password === 0) {
      toast({
        title: 'Fields are should not be empty',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Password and Confirm Password should be same',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    if (password.length < 8) {
      toast({
        title: 'Password must be at least 8 characters long',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    try {
      setIsCreating(true);
      const response = await axios.post(`${api}/api/solve_litigation/auth/create-staff`, {
        fullName,
        address,
        email,
        phoneNumber,
        password,
      });
      console.log(response.data);
      toast({
        title: response.data.message,
        status: 'success',
        duration: 4000,
        position: 'top',
        isClosable: true,
      });
      navigate('/admin-dashboard/manage-staff/staff-list')
    } catch (error) {
      console.error(error);
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      });
    }
    finally {
      setIsCreating(false)
    }
  }

  return (
    <div data-aos='fade-up' className='px-7'>
      <div>
        <Link to={'/admin-dashboard/manage-staff'}>
          <FaArrowLeft size={20} className='cursor-pointer' color={Colors.primary} />
        </Link>
        <p className='text-3xl font-extrabold pb-5 text-center'>Create Staff</p>
      </div>
      <div>
        <form>
          <div className='border rounded-sm p-7 mx-20'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <CustomInput
                  placeholder={'Enter full name'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <CustomInput
                  placeholder={'Enter full address'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <CustomInput
                  placeholder={'Enter email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <CustomInput
                  placeholder={'Enter phone number'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <CustomInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <CustomInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'Enter confirm password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <Checkbox onChange={() => setShowPassword(!showPassword)}>Show password</Checkbox>
            </div>
            <div className='flex justify-center pt-8'>
              <PrimaryButton onClick={handleSubmit} isLoading={isCreating} loadingText={'Creating...'} type="submit" title={'Create staff'} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaffpage;
