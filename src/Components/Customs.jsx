import { Button, Input, Spinner } from '@chakra-ui/react'
import { Colors } from './Colors'
import { useEffect, useState } from 'react'

export const PrimaryButton = ({
  title,
  type,
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
        type={type}
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

export const SLButton = ({
  title,
  variant,
  isLoading,
  iconColor,
  isDisabled,
  onClick,
  width,
  className,
  loadingText,
}) => {
  return (
    <button
      onClick={onClick}
      className={`ml-2 px-4 ${
        isDisabled && 'bg-blue-400 cursor-not-allowed hover:bg-blue-400'
      } ${width && `w-full`} py-2 ${className}
      ${variant === 'primary' && 'bg-primary hover:bg-secondary text-white'}
      ${variant === 'secondary' && 'bg-gray-300 hover:bg-gray-400 text-black'}
      ${variant === 'success' && 'bg-success hover:bg-successHover text-white'}
      ${variant === 'error' && 'bg-error hover:bg-errorHover text-white'}
      flex justify-center items-center gap-2 rounded-sm`}
    >
      {isLoading === true ? <SLSpinner iconColor={iconColor} /> : title}{' '}
      {isLoading && loadingText && loadingText}
    </button>
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
  bgColor,
}) => {
  return (
    <>
      <Input
        bgColor={bgColor}
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

export const Modal = ({ isOpen, children, size }) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  return (
    <>
      {showModal ? (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div className='fixed inset-0 bg-black opacity-50'></div>
          <div
            className={`relative
            ${
              size === 'sm' &&
              'w-[400px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === 'lg' &&
              'w-[450px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === 'md' &&
              'w-[500px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === 'xl' &&
              'w-[600px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === '2xl' &&
              'w-[700px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === '3xl' &&
              'w-[800px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === '4xl' &&
              'w-[900px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${
              size === '5xl' &&
              'w-[1000px] max-sm:w-[95%] overflow-scroll max-sm:m-auto'
            }
            ${size === 'full' && 'w-full h-full'}
             bg-white rounded-sm p-6`}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  )
}

export const ModalContent = ({ children }) => {
  return <div>{children}</div>
}

export const ModalHeader = ({ children }) => {
  return (
    <div className='text-2xl border-b pb-3 font-extrabold text-primary mb-4'>
      {children}
    </div>
  )
}

export const ModalCloseButton = ({ onClick }) => {
  return (
    <button
      className='absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 text-primary w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  )
}

export const ModalBody = ({ children }) => {
  return (
    <div className='text-gray-700 max-h-[600px] md:max-h-[500px] overflow-scroll'>
      {children}
    </div>
  )
}

export const ModalFooter = ({ children }) => {
  return <div className='flex justify-end mt-4'>{children}</div>
}

export const MySpinner = () => {
  return <Spinner color={Colors.primary} />
}

export const SLSpinner = ({ className, iconColor, width }) => {
  return (
    <svg
      className={`${className}`}
      xmlns='http://www.w3.org/2000/svg'
      width={width ? width : '1em'}
      viewBox='0 0 24 24'
    >
      <g stroke={iconColor ? iconColor : '#0052cc'}>
        <circle
          cx='12'
          cy='12'
          r='9.5'
          fill='none'
          strokeLinecap='round'
          strokeWidth='3'
        >
          <animate
            attributeName='stroke-dasharray'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0 150;42 150;42 150;42 150'
          />
          <animate
            attributeName='stroke-dashoffset'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0;-16;-59;-59'
          />
        </circle>
        <animateTransform
          attributeName='transform'
          dur='2s'
          repeatCount='indefinite'
          type='rotate'
          values='0 12 12;360 12 12'
        />
      </g>
    </svg>
  )
}

export const SLRefreshIcon = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
      fill='#0052cc'
      stroke='#0052cc'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g
          fill='none'
          fillRule='evenodd'
          stroke='#0052cc'
          strokeLinecap='round'
          strokeLinejoin='round'
          transform='matrix(0 1 1 0 2.5 2.5)'
        >
          {' '}
          <path d='m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8'></path>{' '}
          <path d='m4 1v4h-4' transform='matrix(1 0 0 -1 0 6)'></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export const SLPrimarySpinner = ({ className }) => {
  return (
    <div className='flex justify-center w-full'>
      <svg
        className={`${className}`}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <g>
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.14'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.29'
            transform='rotate(30 12 12)'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.43'
            transform='rotate(60 12 12)'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.57'
            transform='rotate(90 12 12)'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.71'
            transform='rotate(120 12 12)'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            opacity='0.86'
            transform='rotate(150 12 12)'
          />
          <rect
            width='2'
            height='5'
            x='11'
            y='1'
            fill='#0052cc'
            transform='rotate(180 12 12)'
          />
          <animateTransform
            attributeName='transform'
            calcMode='discrete'
            dur='0.75s'
            repeatCount='indefinite'
            type='rotate'
            values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12'
          />
        </g>
      </svg>
    </div>
  )
}
