import { useEffect, useState } from 'react'

// T CSS
export const SLButton = ({
  title,
  type,
  variant,
  isLoading,
  iconColor,
  isDisabled,
  onClick,
  width,
  className,
  icon,
  loadingText,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 ${
        isDisabled &&
        'bg-blue-400 opacity-70 cursor-not-allowed hover:bg-blue-400'
      } ${width && `w-full`} py-2 ${className}
      ${
        variant === 'outline' &&
        'bg-slate-200 hover:bg-primary hover:text-gray-100 text-black'
      }
      ${variant === 'primary' && 'bg-primary hover:bg-secondary text-white'}
      ${variant === 'secondary' && 'bg-gray-300 hover:bg-gray-400 text-black'}
      ${variant === 'success' && 'bg-success hover:bg-successHover text-white'}
      ${variant === 'error' && 'bg-error hover:bg-errorHover text-white'}
      ${isLoading && 'cursor-not-allowed opacity-70'}
      flex justify-center items-center gap-2 rounded-sm`}
    >
      {icon && icon}
      {isLoading === true ? <SLSpinner iconColor={iconColor} /> : title}{' '}
      {isLoading && loadingText && loadingText}
    </button>
  )
}

// T CSS
export const LinkButton = ({ title, onClick, bgColor }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-base ${
          bgColor ? 'bg-primary' : ''
        } px-3 rounded-sm font-semibold py-[6px] w-full text-start`}
      >
        {title}
      </button>
    </>
  )
}

// T CSS
export const CustomInput = ({
  placeholder,
  autoComplete,
  onChange,
  className,
  value,
  name,
  type,
  list,
  id,
  size,
  bgColor,
}) => {
  return (
    <>
      <input
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        id={id}
        size={size}
        className={`${
          bgColor && bgColor
        } ${className} p-2 w-full max-md:text-base focus:outline-none focus:border-primary border`}
        list={list}
      />
    </>
  )
}

// T CSS
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

// T CSS
export const Modal = ({ isOpen, children, size }) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  return (
    <>
      {showModal ? (
        <div
          className={`fixed inset-0 top-0 bottom-0 z-50 w-screen h-screen flex items-center justify-center`}
        >
          <div className='fixed inset-0 z-40 bg-black opacity-50'></div>
          <div
            className={`relative z-50
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

// T CSS
export const ModalContent = ({ children }) => {
  return <div>{children}</div>
}

// T CSS
export const ModalHeader = ({ children }) => {
  return (
    <div className='text-2xl border-b pb-3 font-extrabold text-primary mb-4'>
      {children}
    </div>
  )
}

// T CSS
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

// T CSS
export const ModalBody = ({ children }) => {
  return (
    <div className='text-gray-700 max-h-[450px] md:max-h-[500px] overflow-scroll'>
      {children}
    </div>
  )
}

// T CSS
export const ModalFooter = ({ children }) => {
  return <div className='flex justify-end gap-2 mt-5'>{children}</div>
}

// T CSS
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

// T CSS
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

// T CSS
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

// T CSS
export const Avatar = () => {
  return (
    <div className='bg-primary w-8 h-8 flex justify-center items-center rounded-sm text-base max-md:text-sm'>
      <p className='text-white'>SL</p>
    </div>
  )
}

// T CSS
export const UploadIcon = ({ size }) => {
  return (
    <svg
      width={size}
      className='text-white fill-white'
      viewBox='0 0 24 24'
      // fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z'
          fill='#ffffff'
        ></path>{' '}
      </g>
    </svg>
  )
}

// T CSS
export const SendIcon = () => {
  return (
    <svg
      className='w-8'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z'
          stroke='#0052cc'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
      </g>
    </svg>
  )
}

// T CSS
export const UploadButton = () => {
  return (
    <div className='flex border group p-1 rounded-sm px-3 gap-2'>
      <svg
        className='w-5'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            d='M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z'
            fill='#0052cc'
          ></path>{' '}
          <path
            d='M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z'
            fill='#0052cc'
          ></path>{' '}
        </g>
      </svg>
      <span className='text-primary'>Upload File</span>
    </div>
  )
}
