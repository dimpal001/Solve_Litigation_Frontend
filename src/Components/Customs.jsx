import { Button, Input, Spinner } from '@chakra-ui/react'
import { Colors } from './Colors'


export const PrimaryButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  size,
  isLoading,
  loadingText,
}) => {
  return (
    <>
      <Button
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        size={size}
        bgColor={Colors.primary}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: Colors.primaryHover,
          boxShadow: 'lg',
        }}
        color={'white'}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const GreenPrimaryButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  size,
  isLoading,
  loadingText,
}) => {
  return (
    <>
      <Button
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        size={size}
        bgColor='#19a60a'
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: '#239c16',
          boxShadow: 'lg',
        }}
        color={'white'}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const PrimaryOutlineButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  size,
  isLoading,
  value,
  loadingText,
  bgColor,
  onChange,
  color,
}) => {
  return (
    <>
      <Button
        value={value}
        className='capitalize'
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        variant={'outline'}
        onChange={onChange}
        bgColor={bgColor}
        size={size}
        borderColor={Colors.primary}
        color={color == null ? Colors.primary : color}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: Colors.primary,
          boxShadow: 'lg',
          color: 'white',
        }}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const PrimaryRedOutlineButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  size,
  isLoading,
  loadingText,
  bgColor,
  color,
}) => {
  return (
    <>
      <Button
        className='capitalize'
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        variant={'outline'}
        bgColor={bgColor}
        size={size}
        borderColor={'red.500'}
        color={color == null ? 'red.500' : color}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: 'red.500',
          boxShadow: 'lg',
          color: 'white',
        }}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const LinkButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  size,
  isLoading,
  loadingText,
  bgColor,
}) => {
  return (
    <>
      <Button
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        variant={'outline'}
        size={size}
        bgColor={bgColor}
        borderWidth={0}
        flex={true}
        justifyContent={'start'}
        textAlign={'start'}
        color={'white'}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: Colors.primary,
          boxShadow: 'lg',
          color: 'white',
        }}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        <div>{title}</div>
      </Button>
    </>
  )
}

export const SecondaryButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  isLoading,
  loadingText,
}) => {
  return (
    <>
      <Button
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        bgColor={Colors.secondary}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: Colors.secondaryHover,
          boxShadow: 'lg',
        }}
        color={'white'}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const NormalButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  isLoading,
  loadingText,
}) => {
  return (
    <>
      <Button
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        bgColor={''}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: Colors.primaryHover,
          boxShadow: 'lg',
          color: 'white',
        }}
        color={Colors.secondary}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const RedButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
  isLoading,
  loadingText,
  size,
}) => {
  return (
    <>
      <Button
        size={size}
        loadingText={loadingText}
        isLoading={isLoading}
        borderRadius={3}
        bgColor={'red.500'}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        width={width}
        _hover={{
          bgColor: 'red.600',
          boxShadow: 'lg',
          color: 'white',
        }}
        color={'white'}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  )
}

export const CustomInput = ({
  placeholder,
  onChange,
  value,
  name,
  type,
  list,
  id,
  isDisabled,
  size,
}) => {
  return (
    <>
      <Input
        size={size}
        borderRadius={3}
        type={type}
        list={list}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        id={id}
        isDisabled={isDisabled}
      />
    </>
  )
}

export const TextButton = ({ title, onClick, size }) => {
  return (
    <p
      className={`px-5 text-${size} font-extrabold text-red-500 hover:text-red-600 cursor-pointer`}
      onClick={onClick}
    >
      {title}
    </p>
  )
}

export const MySpinner = () => {
  return <Spinner color={Colors.primary} />
}
