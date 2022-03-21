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
  useRef,
  useState,
  ChangeEvent,
  useEffect,
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
import { Select } from '../Select';
import { SelectCategoryAction } from '../SelectCategoryAction';
import { Form } from './styles';
import SelectCustomPerson from '../SelectCustomPerson';
import SelectCustomSubjects from '../SelectCustomSubjects';
import SelectCustomLesson from '../SelectCustomLesson';
import SelectCustomContent from '../SelectCustomContent';
import Tooltip from '../Tooltip';

interface IAction {
  id: string;
  name: string;
  description: string;
}

interface ILesson {
  id: string;
  title: string;
  description: string;
  student_lesson: IStudentLesson[];
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
  status: string;
  score: number;
  student: IStudent;
}

interface IStudentLesson {
  id: string;
  status: string;
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

interface IContent {
  id: string;
  name: string;
  type: string;
  type_file: string;
  content_url: string;
  lesson: ILesson;
}

function NewActionModal({
  isOpen,
  setIsOpen,
  handleAddAction,
}: IModalProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher>();

  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [selectSubject, setSelectSubject] = useState<ISubject>();

  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [selectLesson, setSelectLesson] = useState<ILesson>();

  const [contents, setContents] = useState<IContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<IContent>();

  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectStudent, setSelectStudent] = useState<IStudent>();

  const [studentLessons, setStudentLessons] = useState<IStudentLesson[]>([]);
  const [selectedStudentLessons, setSelectedStudentLessons] =
    useState<IStudentLesson>();

  const [selectAction, setSelectAction] = useState();
  const [actions, setActions] = useState<IAction[]>([]);
  const [action, setAction] = useState<IAction>();

  const [selectTypeContext, setSelectTypeContext] = useState();
  const [selectTypeContent, setSelectTypeContent] = useState();
  const [context, setContext] = useState('0');

  const [selectedFile, setSelectedFile] = useState<File>();

  const typeContexts = [
    { id: 1, key: 'REVISAO', name: 'Revisão' },
    { id: 2, key: 'RECOMENDACAO', name: 'Recomendação' },
    { id: 3, key: 'FEEDBACK', name: 'Feedback' },
  ];

  const typeActions = [
    { id: 1, key: 'ATIVIDADE', name: 'Entregar Atividade' },
    { id: 2, key: 'QUIZ', name: 'Entregar Quiz' },
    { id: 3, key: 'TESTE', name: 'Entregar Teste' },
    { id: 4, key: 'MATERIAL', name: 'Entregar Material de estudo' },
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

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line no-shadow
    const context = event.target.value;

    loadActions(context);

    setContext(context);
  }

  // eslint-disable-next-line no-shadow
  async function loadActions(context: string): Promise<void> {
    const response = await api.get(`categoryAction?context=${context}`);

    setActions(response.data.categoryActions);
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
    api.get(`subject?teacher=${selectedTeacher?.id}`).then(response => {
      setSubjects(response.data);
    });
  }, [selectedTeacher]);

  useEffect(() => {
    api.get(`lesson?subject=${selectSubject?.id}`).then(response => {
      setLessons(response.data);
    });
  }, [selectSubject]);

  useEffect(() => {
    api
      .get(`student_lesson?lesson=${selectLesson?.id}&status=${'PENDENTE'}`)
      .then(response => {
        setStudentLessons(response.data);
      });
  }, [selectLesson]);

  function handleSelectedContent(event: ChangeEvent<HTMLSelectElement>) {
    const content = event.target.value;

    loadContents(content);
  }

  async function loadContents(content: string): Promise<void> {
    const response = await api.get(
      `contents?type=${content}&={selectLesson?.id}`,
    );

    setContents(response.data);
  }

  const handleUpload = file => {
    setSelectedFile(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Configurar Ação Programável"
      submit="add-action-button"
    >
      <Form className=" text-sm px-6" ref={formRef} onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-4">
          {/* Lado esquerdo */}
          <div className="w-5/12 space-y-2">
            <Select
              title="Bot"
              data={typeContexts}
              value={selectTypeContext}
              // eslint-disable-next-line react/jsx-no-bind
              change={handleSelectedContext}
            />

            <SelectCategoryAction
              title="Contexto"
              data={actions}
              value={selectAction}
              // eslint-disable-next-line react/jsx-no-bind
              change={handleSelectedAction}
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Descrição</span>
              <textarea
                disabled
                className="p-2 border rounded-lg h-20 border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                name="name"
                value={action?.description}
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
                  name="name"
                />
              </div>
            ) : (
              <></>
            )}

            {context === 'RECOMENDACAO' ||
            selectAction === 'dd05c852-37a7-4380-b23b-89d600dea983' ? (
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Qual a nota?</span>
                <Input
                  className="h-9 p-2 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="name"
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Lado direito */}
          <div className="w-7/12">
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
              <div className="w-full">
                <SelectCustomLesson
                  title="Selecione a Aula"
                  data={lessons}
                  v={selectLesson}
                  change={setSelectLesson}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-700">
                  Descrição da aula
                </span>
                <Input
                  disabled
                  className="h-9 px-2 border rounded-lg border-gray-200 shadow-sm font-light text-gray-600
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500"
                  name="name"
                  value={selectLesson?.description}
                />
              </div>

              <div className="  space-y-2 ">
                {context === 'REVISAO' || context === 'RECOMENDACAO' ? (
                  <>
                    <Select
                      title="Ação"
                      data={typeActions}
                      value={selectTypeContent}
                      change={handleSelectedContent}
                    />
                    <div className="w-full">
                      <SelectCustomContent
                        title="Escolha o conteúdo"
                        data={contents}
                        v={selectedContent}
                        change={setSelectedContent}
                      />
                    </div>
                    <div className="flex flex-col items-center p-2 rounded border space-y-2 bg-gray-100">
                      <Tooltip
                        text="Visualizar arquivo"
                        className="w-1/6 h-1/6"
                      >
                        <a
                          className="bg-gray-500"
                          href={selectedContent?.content_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {selectedContent?.type_file === 'PDF' ? (
                            <>
                              <AiFillFilePdf className="text-red-600 w-full h-full" />
                              <p className="text-gray-400 font-light text-center">
                                {selectedContent.type_file}
                              </p>
                            </>
                          ) : selectedContent?.type_file === 'DOC' ? (
                            <>
                              <AiFillFileText className="text-blue-600 w-full h-full" />{' '}
                              <p className="text-gray-400 font-light text-center">
                                {selectedContent.type_file}
                              </p>
                            </>
                          ) : selectedContent?.type_file === 'IMAGE' ? (
                            <>
                              <AiFillFileImage className="text-green-600 w-full h-full" />
                              <p className="text-gray-400 font-light text-center">
                                {selectedContent.type_file}
                              </p>
                            </>
                          ) : selectedContent?.type_file === 'LINK' ? (
                            <AiOutlineLink className="text-indigo-500 w-full h-full" />
                          ) : (
                            <>
                              <AiFillFileText className="text-gray-400 w-full h-full" />
                              <p className="text-gray-400 font-light text-center">
                                Sem conteúdo
                              </p>
                            </>
                          )}
                        </a>
                      </Tooltip>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* {context === 'FEEDBACK' ? (
              <div className=" space-y-2">
                <List data={students} />
                <button
                  className="bg-indigo-600 p-2 text-white rounded hover:bg-indigo-800"
                  type="button"
                >
                  Atualizar Nota
                </button>{' '}
              </div>
            ) : (
              <></>
            )} */}
                {/* <div className="w-full">
                <SelectCustomStudentLesson
                  title="Alunos/Aula"
                  data={studentLessons}
                  v={selectedStudentLessons}
                  change={setSelectedStudentLessons}
                />
              </div> */}

                {/*
              <div className=" space-y-2">
                <List data={studentLessons} title="Aulas atribuidas" />
                <button
                  className="bg-indigo-600 p-2 text-white rounded hover:bg-indigo-800"
                  type="button"
                >
                  Atualizar Nota
                </button>{' '} 
              </div> */}

                {/* {context === 'RECOMENDACAO' || context === 'REVISAO' ? (
                <div className=" space-y-2">
                  <List data={students} />
                  <button
                    className="bg-indigo-600 p-2 text-white rounded hover:bg-indigo-800"
                    type="button"
                  >
                    Atualizar Nota
                  </button>{' '}
                </div>
              ) : (
                <></>
              )} */}
                {/*
              <div className="flex flex-row space-x-2">
                <div className="">
                 <SelectStudent
                  title="Selecione o aluno"
                  data={subjectStudents}
                  value={selectStudent}
                  change={handleSelectedStudent}
                /> 
                </div>
              </div>
              */}
                {/* {context === 'FEEDBACK' ? (
                <SelectCustomPerson
                  seletedValue={selectedStudent}
                  setSelectedValue={setSelectedStudent}
                  data={students}
                  title="Aluno"
                />
              ) : (
                <></>
              )} */}
                {/* <Upload onFileUploaded={setSelectedFile} /> */}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default NewActionModal;
