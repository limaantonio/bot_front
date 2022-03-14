/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import React, {
  useCallback,
  useRef,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import axios from 'axios';
import Input from '../Input';
import Modal from '../Modal';
import api from '../../services/api';
import { Select } from '../Select';
import { SelectCategoryAction } from '../SelectCategoryAction';
import { SelectLesson } from '../SelectLesson';
import { SelectSubject } from '../SelectSubject';
import { SelectStudent } from '../SelectStudent';
import Upload from '../Upload';
import { Form } from './styles';
import SelectCustom from '../SelectCustom';
import SelectCustomImg from '../SelectCustomImg';
import SelectCustomTeacher from '../SelectCustomTeacher';
import SelectCustomPerson from '../SelectCustomPerson';

interface IAction {
  id: string;
  name: string;
  description: string;
}

interface IContent {
  id: number;
  name: string;
  description: string;
}

interface ILesson {
  id: string;
  title: string;
  description: string;
}

interface ICreateActionData {
  name: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAction: (action: Omit<IAction, 'id' | 'available'>) => void;
}

interface ISubject {
  id: string;
  code: string;
  name: string;
  semester: string;
}

interface ISubjectStudent {
  id: string;
  code: string;
  name: string;
  semester: string;
  student: IStudent;
}

interface IStudent {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  img_url: string;
}

interface IChar {
  id: number;
  name: string;
  image: string;
}

interface ITeacher {
  id: number;
  name: string;
  email: string;
  imgUrl: string;
}

const NewActionModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAction,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [selectedTeacher, setSelectedTeachers] = useState<ITeacher[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudent[]>([]);

  const [selectAction, setSelectAction] = useState();
  const [selectLesson, setSelectLesson] = useState();
  const [selectTypeContext, setSelectTypeContext] = useState();
  const [selectTypeContent, setSelectTypeContent] = useState();
  const [selectSubject, setSelectSubject] = useState();
  const [selectStudent, setSelectStudent] = useState();

  const [context, setContext] = useState('0');
  const [actions, setActions] = useState<IAction[]>([]);

  const [contents, setContents] = useState<IContent[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [subjectStudents, setSubjectStudents] = useState<ISubjectStudent[]>([]);

  const [action, setAction] = useState<IAction>();
  const [subject, setSubject] = useState<ISubject>();
  const [lesson, setLesson] = useState<ILesson>();

  const [selectedFile, setSelectedFile] = useState<File>();

  const [query, setQuery] = useState('');
  const [characters, setCharacters] = useState<IChar[]>([]);

  const typeContexts = [
    { id: 1, key: 'REVISAO', name: 'Revisão' },
    { id: 2, key: 'RECOMENDACAO', name: 'Recomendação' },
    { id: 3, key: 'FEEDBACK', name: 'Feedback' },
  ];

  const typeActions = [
    { id: 1, key: 'ATIVIDADE', name: 'Atividade' },
    { id: 2, key: 'QUIZ', name: 'Entregar Quiz' },
    { id: 3, key: 'TESTE', name: 'Entregar Teste' },
    { id: 4, key: 'MATERIAL', name: 'Material de estudo' },
  ];

  const handleSubmit = useCallback(
    async (data: ICreateActionData) => {
      await handleAddAction(data);
      setIsOpen();
    },
    [handleAddAction, setIsOpen],
  );

  function handleSelectedAction(event: ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;

    actions.map(a => {
      if (a.id === id && a != null) {
        setAction(a);
      }
    });
    setSelectAction(id);
  }

  function handleSelectedSubject(event: ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;

    loadLessons(id);
    loadSubjectStudent(id);

    subjects.map(a => {
      if (a.id === id && a != null) {
        setSubject(a);
      }
    });

    setSelectSubject(id);
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line no-shadow
    const context = event.target.value;

    loadActions(context);

    setContext(context);
  }

  function handleSelectedContent(event: ChangeEvent<HTMLSelectElement>) {
    const content = event.target.value;

    loadContents(content);
  }

  function handleSelectedLesson(event: ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;

    lessons.map(a => {
      if (a.id === id && a != null) {
        setLesson(a);
      }
    });

    setSelectLesson(id);
  }

  function handleSelectedStudent(event: ChangeEvent<HTMLSelectElement>) {
    const selectedStudents = event.target.value;
  }

  // eslint-disable-next-line no-shadow
  async function loadActions(context: string): Promise<void> {
    const response = await api.get(`categoryAction?context=${context}`);

    setActions(response.data.categoryActions);
  }

  async function loadContents(content: string): Promise<void> {
    const response = await api.get(`contents?type=${content}`);

    setContents(response.data);
  }

  // eslint-disable-next-line no-shadow
  async function loadLessons(subject: string): Promise<void> {
    const response = await api.get(`lesson?subject$=${subject}`);

    setLessons(response.data);
  }

  // eslint-disable-next-line no-shadow
  async function loadSubjectStudent(subject: string): Promise<void> {
    const response = await api.get(`registration?subject=${subject}`);

    setSubjectStudents(response.data);
  }

  useEffect(() => {
    api.get('subject').then(response => {
      setSubjects(response.data);
      loadLessons(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('teacher').then(response => {
      setTeachers(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('student').then(response => {
      setStudents(response.data);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await api.get(`subject=${query}`);
  //       setCharacters(data.results);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [query]);

  const handleUpload = file => {
    setSelectedFile(file);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form className=" text-sm" ref={formRef} onSubmit={handleSubmit}>
        <h1 className="text-xl mb-4 font-bold">Configurar Ação Programável</h1>
        <div className="flex flex-row space-x-4">
          {/* Lado esquerdo */}
          <div className="w-1/2 space-y-2">
            <Select
              title="Bot"
              data={typeContexts}
              value={selectTypeContext}
              // eslint-disable-next-line react/jsx-no-bind
              change={handleSelectedContext}
            />

            <SelectCategoryAction
              title="Tipo"
              data={actions}
              value={selectAction}
              // eslint-disable-next-line react/jsx-no-bind
              change={handleSelectedAction}
            />

            <div className="flex flex-col">
              <span className="font-medium">Descrição</span>
              <textarea
                disabled
                className="p-2 border rounded-lg h-16 border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                name="name"
                value={action?.description}
              >
                {}
              </textarea>
            </div>

            {/* <div className="search">
              <input
                type="text"
                placeholder="Search Character"
                className="input"
                onChange={event => setQuery(event.target.value)}
                value={query}
              />
            </div>
            <div className="results">
              {characters.map(character => (
                <div>
                  <img src={character.image} alt={character.name} />
                  {character.name}
                </div>
              ))}
            </div> */}

            {/* <SelectCustomImg
              seletedValue={selected}
              setSelectedValue={setSelected}
              data={people}
              title="Professor"
            /> */}

            {/* <SelectCustom
              seletedValue={testSubjects}
              setSelectedValue={setTestSubjects}
              data={subjects}
              title="Disciplina"
            /> */}
          </div>
          {/* Lado direito */}
          <div className="w-1/2 space-y-2">
            <SelectCustomPerson
              seletedValue={selectedTeacher}
              setSelectedValue={setSelectedTeachers}
              data={teachers}
              title="Professor"
            />

            <SelectSubject
              title="Disciplinas/Turma"
              data={subjects}
              value={selectSubject}
              change={handleSelectedSubject}
            />

            <div className="flex flex-row space-x-2">
              <div className="w-6/12">
                {/* <SelectStudent
                  title="Selecione o aluno"
                  data={subjectStudents}
                  value={selectStudent}
                  change={handleSelectedStudent}
                /> */}
                <SelectCustomPerson
                  seletedValue={selectedStudent}
                  setSelectedValue={setSelectedStudent}
                  data={students}
                  title="Alunos"
                />
              </div>
              <div className="w-6/12">
                <SelectLesson
                  title="Selecione a aula"
                  data={lessons}
                  value={selectLesson}
                  change={handleSelectedLesson}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Descrição da aula</span>
              <Input
                disabled
                className="h-9 px-2 border rounded-lg border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                name="name"
                value={lesson?.description}
              />
            </div>

            <Select
              title="Ação"
              data={typeActions}
              value={selectTypeContent}
              change={handleSelectedContent}
            />

            {/* <div className="w-4/12">
              <SelectContent title="Conteúdo" data={contents} value={selectContent} change={handleSelectedContent}/>
            </div> */}

            {context === 'REVISAO' ? (
              <div className="flex flex-col">
                <span className="font-medium">Quantidade de dias</span>
                <Input
                  className="h-9 p-2 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="name"
                />
              </div>
            ) : (
              <></>
            )}

            <Upload onFileUploaded={setSelectedFile} />
          </div>
        </div>
        <div className="w-full flex flex-row justify-end">
          <button
            className="px-8 p-2 bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md text-white"
            type="submit"
            data-testid="add-action-button"
          >
            <p className="text">Finalizar</p>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default NewActionModal;
