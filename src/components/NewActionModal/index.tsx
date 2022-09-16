/* eslint-disable react-hooks/exhaustive-deps */
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
import DatePicker from '../DatePicker';
import Alert, { showSnackbar } from '../Snackbar';

interface IAction {
  id: string;
  deadline: number;
  url: string;
  type_file: string;
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
  url: string;
  type_file: string;
  title: string;
  task: string;
  lesson: string;
  file: File;
  dt_complete_class: string;
  passing_score: string;
  category_action: string;
  updateScore: boolean;
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

  const [valueRadio, setValueRadio] = useState(false);

  const handleChangeRadio = () => {
    setValueRadio(!valueRadio);
  };

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
    { id: 3, name: 'MONITORAMENTO', label: 'Monitoramento' },
  ];

  const typeActions = [
    { id: 1, name: 'ATIVIDADE', label: 'Entregar Atividade' },
    { id: 2, name: 'QUIZ', label: 'Entregar Quiz' },
    { id: 3, name: 'TESTE', label: 'Entregar Teste' },
    { id: 4, name: 'MATERIAL', label: 'Entregar Material de estudo' },
    {
      id: 5,
      name: 'DIAGNOSIS',
      label: 'Entregar Instrumento para diagnóstico',
    },
    { id: 6, name: 'ATUALIZAR_NOTA', label: 'Atualizar nota' },
  ];

  const [title, setTitle] = useState('0');
  const [selectActionTitle, setSelectActionTitle] = useState();

  const [updateScore, setUpdateScore] = useState(false);

  async function handleSubmit(data: ICreateActionData) {
    const recipeData = new FormData();

    // if (!uploadedFiles) {
    //   throw new Error('No File Found');
    // }

    if (uploadedFiles) {
      recipeData.append('file', uploadedFiles);
    }

    // if (updateScore) {
    //   recipeData.append('update_score', JSON.stringify(updateScore));
    // }

    if (title === 'ATUALIZAR_NOTA') {
      recipeData.append('update_score', JSON.stringify(true));
    }

    if (title) {
      recipeData.append('title', title);
    }

    recipeData.append('task', data.task);

    recipeData.append('category_action', data.category_action);

    recipeData.append('lesson', data.lesson);

    if (data.dt_complete_class) {
      recipeData.append('dt_complete_class', data.dt_complete_class);
    }
    if (data.deadline) {
      recipeData.append('deadline', data.deadline);
    }

    if (data.passing_score) {
      recipeData.append('passing_score', data.passing_score);
    }

    if (data.url) {
      recipeData.append('url', data.url);
    }

    if (!valueRadio) {
      recipeData.append('type_file', 'LINK');
    }

    try {
      const r = await api.post('/action', recipeData).then(response => {
        showSnackbar({
          type: 'success',
          message: 'Ação criada com sucesso!',
        });
      });

      setIsOpen();
    } catch (err) {
      showSnackbar({
        type: 'error',
        message: 'Ocorreu um erro ao inserir o registro. Tente novamente.',
      });
      setIsOpen();
    }
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line no-shadow
    const context = event.target.value;

    setContext(context);
  }

  useEffect(() => {
    loadCategoryActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    api.get('teacher').then(response => {
      setTeachers(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`subject?teacher=${selectedTeacher?.id}`).then(response => {
      setSubjects(response.data);
    });
  }, [selectedTeacher]);

  function handleSelectedTypeActions(event: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line no-shadow
    const title = event.target.value;

    setTitle(title);
  }

  useEffect(() => {
    loadLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleCheck() {
    setUpdateScore(!updateScore);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Configurar Ação Programável"
        submit="add-action-button"
      >
        <Form
          ref={formRef}
          className="text-sm sm:px-6 "
          onSubmit={handleSubmit}
        >
          <div className="flex sm:flex-row px-2 space-y-2 flex-col sm:space-x-4 h-96 overflow-auto">
            {/* Lado esquerdo */}
            <div className="sm:w-6/12 sm:space-y-2">
              <Selects
                title="Bot"
                data={typeContexts}
                value={selectTypeContext}
                // eslint-disable-next-line react/jsx-no-bind
                change={handleSelectedContext}
              />
              <div className="">
                <span>Contexto</span>
                <Select2
                  name="category_action"
                  options={categoryActions}
                  selectedOption={selectCategoryActions}
                  setSelectedOption={setSelectCategoryActions}
                />
              </div>

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

              {/* {context === 'MONITORAMENTO' ? (
                <div
                  className="flex flex-row items-center space-x-2"
                  id="checkUpdate"
                >
                  <input
                    className="h-5 w-5"
                    id="checkUpdate"
                    type="checkbox"
                    checked={updateScore}
                    onChange={handleCheck}
                  />
                  <label>Atualizar nota?</label>
                </div>
              ) : (
                <></>
              )} */}

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

              {context === 'RECOMENDACAO' ||
              selectCategoryActions?.description ===
                'Se nota >= ? em uma atividade x da aula invertida e não concluiu a aula invertida e se passaram pelo menos ? dias da data de entrega.' ? (
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">
                    Qual a nota?
                  </span>
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
            <div className="sm:w-6/12  ">
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
                {selectCategoryActions?.description !==
                'O aluno finalizou uma atividade especifica de uma aula invertida a no minimo X dias.' ? (
                  <div className="">
                    <span>Atividades</span>
                    <Select2
                      name="task"
                      options={studentTasks}
                      selectedOption={selectedStudentTasks}
                      setSelectedOption={setSelectedStudentTaks}
                    />
                  </div>
                ) : (
                  <></>
                )}

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
                  {context === 'REVISAO' ||
                  context === 'RECOMENDACAO' ||
                  context === 'MONITORAMENTO' ? (
                    <>
                      {/* Julgo que o titulo poderia ser livre */}
                      <div className=" w-full">
                        <Selects
                          title="Ação"
                          data={typeActions}
                          value={title}
                          // eslint-disable-next-line react/jsx-no-bind
                          change={handleSelectedTypeActions}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {context === 'MONITORAMENTO' ? (
                    <></>
                  ) : (
                    <div className="">
                      <div className="flex flex-row space-x-2">
                        <div className="flex flex-row items-center space-x-2">
                          <input
                            type="checkbox"
                            id="externo"
                            checked={valueRadio}
                            onChange={handleChangeRadio}
                            name="type_file"
                            value="EXTERNO"
                          />
                          <label>Arquivo Externo?</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {context === 'MONITORAMENTO' ? (
                    <></>
                  ) : valueRadio === true ? (
                    <Upload onFileUploaded={handleUpload} />
                  ) : (
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        Conteúdo
                      </span>
                      <Input
                        placeholder="Cole o link aqui"
                        className="h-9 p-2 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
    focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                        name="url"
                      />
                    </div>
                  )}

                  {context === 'REVISAO' || context === 'RECOMENDACAO' ? (
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        Prazo de entrega da atividade
                      </span>
                      <DatePicker
                        className="p-2 border rounded-lg h-10 border-gray-200 shadow-sm font-light text-gray-600"
                        name="dt_complete_class"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
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
      <Alert />
    </>
  );
}

export default NewActionModal;
