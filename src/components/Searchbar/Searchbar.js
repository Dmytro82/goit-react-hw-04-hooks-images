import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  SearchbarHeader,
  SearchForm,
  Button,
  ButtonText,
  FormInput,
  ButtonIcon,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Empty query!', {
        style: {
          border: '1px solid #E8301C',
          color: '#E8301C',
        },
      });

      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonIcon />
          <ButtonText>Search</ButtonText>
        </Button>

        <FormInput
          onChange={handleNameChange}
          name="imageName"
          value={imageName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     imageName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ imageName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.imageName.trim() === '') {
//       toast.error('Empty query!', {
//         style: {
//           border: '1px solid #E8301C',
//           color: '#E8301C',
//         },
//       });
//       return;
//     }
//     this.props.onSubmit(this.state.imageName);
//     this.setState({ imageName: '' });
//   };

//   render() {
//     const { imageName } = this.state;
//     return (
//       <SearchbarHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <Button type="submit">
//             <ButtonIcon />
//             <ButtonText>Search</ButtonText>
//           </Button>

//           <FormInput
//             onChange={this.handleNameChange}
//             name="imageName"
//             value={imageName}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </SearchbarHeader>
//     );
//   }
// }

// export default Searchbar;
