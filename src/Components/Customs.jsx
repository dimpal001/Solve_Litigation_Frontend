import { Button } from '@chakra-ui/react'
import { Colors } from './Colors'

export const PrimaryButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <Button
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

export const SecondaryButton = ({
  title,
  rightIcon,
  leftIcon,
  width,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <Button
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
