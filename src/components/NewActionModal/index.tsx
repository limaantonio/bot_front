import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState, ChangeEvent, useEffect } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import api from '../../services/api';
import { Form } from './styles';
import { Select } from '../Select';
import { SelectCategoryAction } from '../SelectCategoryAction';
import { SelectLesson } from '../SelectLesson';
import { SelectContent } from '../SelectContent';
import { SelectSubject } from '../SelectSubject';
import { SelectStudent } from '../SelectStudent';
import Dropzone from '../Dropzone';
import Upload from '../Dropzone';


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
}

const NewActionModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAction,
  
}) => {
  const formRef = useRef<FormHandles>(null);

  const [selectAction, setSelectAction] = useState();
  const [selectLesson, setSelectLesson] = useState();
  const [selectTypeContext, setSelectTypeContext] = useState();
  const [selectTypeContent, setSelectTypeContent] = useState();
  const [selectContent, setSelectContent] = useState();
  const [selectSubject, setSelectSubject] = useState();
  const [selectStudent, setSelectStudent] = useState();
  
  const [context, setContext] = useState('0');
  const [actions, setActions] = useState<IAction[]>([]);
  
  const [contents, setContents] = useState<IContent[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [subjectStudents, setSubjectStudents] = useState<ISubjectStudent[]>([]);

  const [action, setAction] = useState<IAction>();
  const [subject, setSubject] = useState<ISubject>();
  const [lesson, setLesson] = useState<ILesson>();

  const [selectedFile, setSelectedFile] = useState<File>();

  const typeContexts = [
    {id: 1, key: 'REVISAO', name: "Revisão"},
    {id: 2, key: 'RECOMENDACAO', name: "Recomendação"},
    {id: 3, key: 'FEEDBACK', name: "Feedback"}
  ];

  const typeActions = [
    {id: 1, key: 'QUIZ', name: "Entregar Quiz"},
    {id: 2, key: 'TESTE', name: "Entregar Teste"},
    {id: 3, key: 'MATERIAL', name: "Material de estudo"}
  ];

  const handleSubmit = useCallback(
    async (data: ICreateActionData) => {
      await handleAddAction(data);
      setIsOpen();
    },
    [handleAddAction, setIsOpen],
  ); 

  function handleSelectedAction(event: ChangeEvent<HTMLSelectElement>){
    const id = event.target.value;
    
    actions.map(a => {
     if (a.id == id && a != null) {
      setAction(a);
     } 
    });
    setSelectAction(id);
  }

  function handleSelectedSubject(event: ChangeEvent<HTMLSelectElement>){
    const id = event.target.value;

    loadLessons(id);
    loadSubjectStudent(id);

    subjects.map(a => {
      if (a.id == id && a != null) {
       setSubject(a);
      } 
     });
   
    setSelectSubject(id);
  }

  function handleSelectedContext(event: ChangeEvent<HTMLSelectElement>){
    const context = event.target.value;

    loadActions(context);

    setContext(context);
  }

  function handleSelectedContent(event: ChangeEvent<HTMLSelectElement>){
    const content = event.target.value;

    loadContents(content);
  }

  function handleSelectedLesson(event: ChangeEvent<HTMLSelectElement>){
    const id = event.target.value;
    
    lessons.map(a => {
      if (a.id == id && a != null) {
       setLesson(a);
      } 
     });

     console.log(id)
   
    setSelectLesson(id);
  }

  function handleSelectedStudent(event: ChangeEvent<HTMLSelectElement>){
    const selectedStudent = event.target.value;
   
  }

  async function loadActions(context: string): Promise<void> {
    const response = await api.get(`categoryAction?context=${context}`);

    setActions(response.data.categoryActions);
  }

  async function loadContents(content: string): Promise<void> {
    const response = await api.get(`contents?type=${content}`);

    setContents(response.data);
  }

  async function loadLessons(subject: string): Promise<void> {
    const response = await api.get(`lesson?subject$=${subject}`);

    setLessons(response.data);
  }

  async function loadSubjectStudent(subject: string): Promise<void> {
   
    const response = await api.get(`registration?subject=${subject}`);

    setSubjectStudents(response.data);
  }

  useEffect(() => {
    api.get('subject').then(response => {
      setSubjects(response.data);
      loadLessons(response.data)
    });

   },[]);

   const handleUpload = (file) => {
    setSelectedFile(file);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>    
      <Form className="space-y-4 mb-14 p-2 space-y-2 flex flex-col text-sm" ref={formRef} onSubmit={handleSubmit}>
        <h1 className="text-xl mb-4 font-bold">Configurar Ação Programável</h1>

        <div className="flex flex-row space-x-2">
          <div className="w-3/12">
           <Select title="Bot" data={typeContexts} value={selectTypeContext} change={handleSelectedContext}/>
          </div>
          <div className="w-9/12">
            <SelectCategoryAction title="Tipo" data={actions} value={selectAction} change={handleSelectedAction}/>
          </div>
        </div>
      
          <div className="flex flex-col">
            <span className="font-medium">Descrição</span>
            <textarea className="p-2 border rounded-lg h-16 border-gray-200 shadow-sm font-light text-gray-600
             focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500" name="name" value={action?.description}>{}</textarea>
          </div>

        <div className="flex flex-row space-x-2">
          <div className="w-4/12">
            <SelectSubject title="Selecione a materia" data={subjects} value={selectSubject} change={handleSelectedSubject}/>  
          </div>
          <div className="w-4/12">
            <SelectStudent title="Selecione o aluno" data={subjectStudents} value={selectStudent} change={handleSelectedStudent}/>
          </div>
          <div className="w-4/12">
            <SelectLesson title="Selecione a aula" data={lessons} value={selectLesson} change={handleSelectedLesson}/>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Descrição da aula</span>
          <Input className="h-9 px-2 border rounded-lg border-gray-200 shadow-sm font-light text-gray-600
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500" name="name" value={lesson?.description}/>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-4/12">
            <Select title="Ação" data={typeActions} value={selectTypeContent} change={handleSelectedContent}/>
          </div>
          {/* <div className="w-4/12">
            <SelectContent title="Conteúdo" data={contents} value={selectContent} change={handleSelectedContent}/>
          </div> */}
       
        
          <div className="flex flex-col w-1/2">
            <span className="font-medium">Quantidade de dias</span>
            <Input className="h-9 rounded-lg border border-gray-200 shadow-sm font-light text-gray-600
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-sky-500" name="name"/>
          </div>
        </div>

      
          <Upload onFileUploaded={setSelectedFile}/>
      
       
        
        <button 
          className=" bg-blue-500 hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 rounded-md text-white w-36 absolute right-7 bottom-4" 
          type="submit" data-testid="add-action-button">
          <p className="text">Finalizar</p>
        </button>

      </Form>
    </Modal>
  );
};

export default NewActionModal;
