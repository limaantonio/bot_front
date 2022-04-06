/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import React, {
  useCallback,
  useState,
  ChangeEvent,
  useEffect,
  useRef,
} from 'react';
import {
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFileText,
  AiOutlineLink,
} from 'react-icons/ai';
import { MdFormatListBulleted } from 'react-icons/md';
import { GrDocument } from 'react-icons/gr';
import Input from '../Input';
import Modal from '../Modal';
import api from '../../services/api';
import { Selects } from '../Selects';
import { SelectCategoryAction } from '../SelectCategoryAction';
import { Form } from './styles';
import SelectCustomPerson from '../SelectCustomPerson';
import SelectCustomSubjects from '../SelectCustomSubjects';
import SelectCustomLesson from '../SelectCustomLesson';
import SelectCustomContent from '../SelectCustomContent';
import Tooltip from '../Tooltip';
import Select2 from '../Select2';
import Upload from '../Upload';

interface IAction {
  id: string;
  deadline: number;
  title: string;
  task: string;
  file: File;

  category_action: string;
}

interface ILesson {
  id: string;
  title: string;
  description: string;
  student_lesson: string;
  value: string;
}

interface ICreateActionData {
  deadline: string;
  title: string;
  task: string;
  file: File;

  category_action: string;
}

interface ICreateAction {
  name: string;
  context: string;
  value: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // handleAddAction: (action: Omit<IAction, 'id' | 'active'>) => void;
}

interface ISubject {
  id: string;
  code: string;
  name: string;
  semester: string;
}

interface ISubjectStudent {
  id: string;
  status: string;
  score: number;
  student: IStudent;
}

interface IStudentTask {
  id: string;
  status: string;
  file: string;
  type_file: string;
  score: number;
  lesson: ILesson;
  student: IStudent;
}

interface IStudent {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  img_url: string;
}

interface ITeacher {
  id: string;
  name: string;
  email: string;
  img_url: string;
}

interface ITask {
  id: string;
  name: string;
  type: string;
  type_file: string;
  file: string;
  lesson: ILesson;
}

interface FileProps {
  file: File;
}

function NewActionModal({ isOpen, setIsOpen }: IModalProps): JSX.Element {
  // const [teachers, setTeachers] = useState([{ id: '', name: '' }]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher>();

  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [selectSubject, setSelectSubject] = useState<ISubject>();

  const [lessons, setLessons] = useState();
  const [selectLesson, setSelectLesson] = useState<ILesson>();

  const [categoryActions, setCategoryActions] = useState();
  const [selectCategoryActions, setSelectCategoryActions] =
    useState<ICreateAction>();

  const [studentTasks, setStudentTasks] = useState();
  const [selectedStudentTasks, setSelectedStudentTaks] =
    useState<IStudentTask>();

  const [students, setStudents] = useState<IStudent[]>([]);

  const [selectAction, setSelectAction] = useState();
  const [actions, setActions] = useState<IAction[]>([]);
  const [action, setAction] = useState<IAction>();

  const [selectTypeContext, setSelectTypeContext] = useState();
  const [context, setContext] = useState('0');

  const [uploadedFiles, setUploadedFiles] = useState<File>();

  const formRef = useRef<FormHandles>(null);

  const typeContexts = [
    { id: 1, name: 'REVISAO', label: 'Revisão' },
    { id: 2, name: 'RECOMENDACAO', label: 'Recomendação' },
    { id: 3, name: 'FEEDBACK', label: 'Feedback' },
  ];

  const typeActions = [
    { name: 'ATIVIDADE', label: 'Entregar Atividade' },
    { name: 'QUIZ', label: 'Entregar Quiz' },
    { name: 'TESTE', label: 'Entregar Teste' },
    { name: 'MATERIAL', label: 'Entregar Material de estudo' },
  ];

  const [title, setTitle] = useState({
    name: '',
    label: '',
  });

  async function handleSubmit(data: ICreateActionData) {
    const recipeData = new FormData();

    if (!uploadedFiles) {
      throw new Error('No Image Found');
    }

    if (uploadedFiles) {
      recipeData.append('file', uploadedFiles);
    }

    recipeData.append('task', data.task);
    recipeData.append('category_action', data.category_action);
    recipeData.append('deadline', data.deadline);
    await api.post('/action', recipeData);
    setIsOpen();
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line no-shadow
    const context = event.target.value;

    // loadActions(context);

    setContext(context);
  }

  useEffect(() => {
    api.get('student').then(response => {
      setStudents(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('teacher').then(response => {
      setTeachers(response.data);
    });
  }, []);

  useEffect(() => {
    loadCategoryActions();
  }, [context]);

  async function loadCategoryActions() {
    const res = await api.get(`categoryAction?context=${context}`);
    const { data } = res;

    const options = data.categoryActions.map(d => ({
      value: d.id,
      label: d.name,
      description: d.description,
    }));

    setCategoryActions(options);
  }

  useEffect(() => {
    api.get(`subject?teacher=${selectedTeacher?.id}`).then(response => {
      setSubjects(response.data);
    });
  }, [selectedTeacher]);

  useEffect(() => {
    loadLessons();
  }, [selectSubject]);

  async function loadLessons() {
    const res = await api.get(`lesson?subject=${selectSubject?.id}`);
    const { data } = res;

    const options = data.map(d => ({
      value: d.id,
      label: d.title,
      description: d.description,
    }));

    setLessons(options);
  }

  useEffect(() => {
    loadContents();
  }, [selectLesson]);

  async function loadContents(): Promise<void> {
    const res = await api.get(`tasks?lesson=${selectLesson?.value}`);
    const { data } = res;

    const options = data.map(d => ({
      value: d.id,
      label: d.name,
      file: d.file,
      type_file: d.type_file,
    }));

    setStudentTasks(options);
  }

  const handleUpload = file => {
    setUploadedFiles(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Configurar Ação Programável"
      submit="add-action-button"
    >
      <Form ref={formRef} className=" text-sm px-6" onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-4">
          {/* Lado esquerdo */}
          <div className="w-6/12 space-y-2">
            <Selects
              title="Bot"
              data={typeContexts}
              value={selectTypeContext}
              // eslint-disable-next-line react/jsx-no-bind
              change={handleSelectedContext}
            />

            <Select2
              name="category_action"
              options={categoryActions}
              selectedOption={selectCategoryActions}
              setSelectedOption={setSelectCategoryActions}
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Descrição</span>
              <textarea
                disabled
                className="p-2 border rounded-lg h-20 border-gray-200 shadow-sm font-light text-gray-600
    focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                name="name"
                value={selectCategoryActions?.description}
              />
            </div>

            {context === 'REVISAO' ? (
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">
                  Quantidade de dias
                </span>
                <Input
                  className="h-9 p-2 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
    focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="deadline"
                />
              </div>
            ) : (
              <></>
            )}

            <Input name="s" />

            {context === 'RECOMENDACAO' ||
            selectAction === 'dd05c852-37a7-4380-b23b-89d600dea983' ? (
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Qual a nota?</span>
                <Input
                  className="h-9 p-2 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
    focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="passing_score"
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Lado direito */}
          <div className="w-6/12">
            <h1 className="border-l border-r border-t p-3 rounded-t ">
              Informações
            </h1>
            <div className="border p-3 space-y-2 rounded-b ">
              {/* correto */}
              <div className="w-full">
                <SelectCustomPerson
                  title="Professor"
                  data={teachers}
                  v={selectedTeacher}
                  change={setSelectedTeacher}
                />
              </div>

              <div className="w-full">
                <SelectCustomSubjects
                  title="Disciplinas/Turma"
                  data={subjects}
                  v={selectSubject}
                  change={setSelectSubject}
                />
              </div>

              <div className="">
                <span>Aulas</span>
                <Select2
                  name="lesson"
                  options={lessons}
                  selectedOption={selectLesson}
                  setSelectedOption={setSelectLesson}
                />
              </div>

              <div className="">
                <span>Atividades</span>
                <Select2
                  name="task"
                  options={studentTasks}
                  selectedOption={selectedStudentTasks}
                  setSelectedOption={setSelectedStudentTaks}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Descrição</span>
                <textarea
                  disabled
                  className="p-2 border rounded-lg h-20 border-gray-200 shadow-sm font-light text-gray-600
    focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="name"
                  value={selectLesson?.description}
                />
              </div>

              <div className="  space-y-2 ">
                {context === 'REVISAO' || context === 'RECOMENDACAO' ? (
                  <>
                    {/* Julgo que o titulo poderia ser livre */}
                    <div className=" w-full">
                      <span>Ação</span>
                      <Select2
                        name="title"
                        options={typeActions}
                        selectedOption={title}
                        setSelectedOption={setTitle}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <Upload onFileUploaded={handleUpload} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end space-x-2 border-t px-6 py-2">
          <button
            className="px-8 p-2 bg-gray-200 hover:bg-gray-300 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md text-white"
            type="submit"
            onClick={() => setIsOpen()}
          >
            <p className="text-gray-600">Cancelar</p>
          </button>
          <button
            className="px-8 p-2 bg-indigo-600 hover:bg-indigo-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md text-white"
            type="submit"
            data-testid="add-action-button"
          >
            <p className="text">Salvar</p>
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewActionModal;
