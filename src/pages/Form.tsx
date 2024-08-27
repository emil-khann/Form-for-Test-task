import { useState, ChangeEvent, FormEvent, FC } from 'react';
import './Form.css';

// Определяем типы для данных формы
interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  files: File[];
  agree: boolean;
}

const Form: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    files: [],
    agree: false,
  });

  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...newFiles],
    }));
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFormData((prevData) => ({
      ...prevData,
      files: prevData.files.filter(file => file !== fileToRemove),
    }));
  };

  const handleAgreeChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      agree: !prevData.agree,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const toggleQuestions = () => {
    setShowQuestions(prev => !prev);
  };

  const isButtonDisabled = !formData.agree;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {showQuestions ? (
        <div className="form__questions">
          <h2 className="form__title">Что написать в сообщении или файле?</h2>
          <ol>
            <li>Чем вы занимаетесь? 
              <ul>
                <li>Расскажите о своей компании.</li>
                <li>Как работаете, на чем зарабатываете?</li>
                <li>Кто ваши конкуренты? Чем вы от них отличаетесь?</li>
              </ul>
            </li>
            <li>В чем ваша задача? 
              <ul>
                <li>Чего хотите достичь в ближайшем будущем?</li>
                <li>Что вам мешает?</li>
              </ul> 
            </li>
            <li>Каким вы видите решение задачи? 
              <ul>
                <li>Как планируете достичь своих целей?</li>
                <li>Какие решения пробовали раньше?</li>
              </ul> 
            </li>
            <li>Какие у вас ожидания от результата? 
              <ul>
                <li>В каком виде вы хотите видеть решение вашей задачи? В какой срок?</li>
                <li>Почему он важен?</li>
                <li>На что это должно быть похоже?</li>
              </ul>
            </li>
            <li>Сколько денег планируете потратить? 
              <ul>
                <li>Каков ваш бюджет?</li>
                <li>Почему вы готовы потратить именно такую сумму?</li>
              </ul>
            </li>
          </ol>
          <button 
            type="button" 
            className="form__back-button"
            onClick={toggleQuestions}
          >
            <span className="form__back-icon">←</span> Вернуться к заполнению формы
          </button>
        </div>
      ) : (
        <>
          <h2 className="form__title">Сообщение в свободной форме</h2>
          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="form__input-placeholder">Ваше имя</span>
          </div>

          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="text"
              name="company"
              placeholder="Компания"
              value={formData.company}
              onChange={handleChange}
            />
            <span className="form__input-placeholder">Компания</span>
          </div>

          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
            />
            <span className="form__input-placeholder">Телефон</span>
          </div>

          <div className="form__input-wrapper">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="form__input-placeholder">Электронная почта</span>
          </div>

          <div className="form__textarea-wrapper">
            <textarea
              className="form__textarea"
              name="message"
              placeholder="Напишите текст обращения"
              value={formData.message}
              onChange={handleChange}
            />
            <span className="form__textarea-placeholder">Напишите текст обращения</span>
            <button
              type="button"
              className="form__toggle-button"
              onClick={toggleQuestions}
            >
              ?
            </button>
          </div>

          <label className="form__label-file">
            <input
              className="form__input-file"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <span className="form__file-text">или прикрепите файл</span>
          </label>

          <div className="form__file-list">
            {formData.files.length > 0 && (
              <ul className="form__file-list-items">
                {formData.files.map((file, index) => (
                  <li key={index} className="form__file-list-item">
                    {file.name}
                    <button
                      type="button"
                      className="form__file-remove-button"
                      onClick={() => handleFileRemove(file)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form__submit">
            <label className="form__label-agree">
              <input
                className="form__input-checkbox"
                type="checkbox"
                checked={formData.agree}
                onChange={handleAgreeChange}
              />
              <span className="form__checkbox-text">согласен на обработку моих <a href="#" className="form__link">персональных данных</a></span>
            </label>

            <button 
              className={`form__button ${isButtonDisabled ? 'form__button--disabled' : ''}`} 
              type="submit"
              disabled={isButtonDisabled}
            >
              Отправить
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
