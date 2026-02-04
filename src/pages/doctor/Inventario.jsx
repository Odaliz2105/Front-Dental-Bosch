import React, { useState, useEffect } from 'react';
import { useAuthDoctor } from '../../context/storeAuth.jsx';
import { inventarioService } from '../../services/authService.js';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiPackage, FiFilter } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventario = () => {
  const { authDoctor } = useAuthDoctor();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Medicamentos',
    codigo: '',
    cantidad: '',
    stockMinimo: '',
    stockMaximo: '',
    unidadMedida: 'Unidades',
    precioCompra: '',
    precioVenta: '',
    proveedor: '',
    ubicacion: '',
    descripcion: ''
  });

  const categorias = [
    'Medicamentos',
    'Material dental',
    'Instrumental',
    'Equipamiento',
    'Productos de higiene',
    'Anestesia',
    'Otros'
  ];

  const unidadesMedida = [
    'Unidades',
    'Cajas',
    'Frascos',
    'Paquetes',
    'Kilogramos',
    'Litros',
    'Mililitros',
    'Gramos',
    'Otros'
  ];

  useEffect(() => {
    fetchInventario();
  }, []);

  useEffect(() => {
    let filtered = items;
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoriaFilter) {
      filtered = filtered.filter(item => item.categoria === categoriaFilter);
    }
    
    setFilteredItems(filtered);
  }, [items, searchTerm, categoriaFilter]);

  const fetchInventario = async () => {
    setLoading(true);
    try {
      console.log('Obteniendo inventario...');
      const response = await inventarioService.listarInventario();
      console.log('Respuesta del servidor:', response);
      
      // Manejar diferentes formatos de respuesta
      const itemsData = response.items || response.data || response || [];
      console.log('Items procesados:', itemsData);
      
      setItems(itemsData);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
      const errorMessage = error.response?.data?.msg || error.message || 'Error al cargar el inventario';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        await inventarioService.actualizarItemInventario(editingItem._id, formData);
        toast.success('Item actualizado correctamente');
      } else {
        await inventarioService.crearItemInventario(formData);
        toast.success('Item creado correctamente');
      }
      
      fetchInventario();
      resetForm();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error al guardar el item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      categoria: item.categoria,
      codigo: item.codigo,
      cantidad: item.cantidad,
      stockMinimo: item.stockMinimo,
      stockMaximo: item.stockMaximo,
      unidadMedida: item.unidadMedida,
      precioCompra: item.precioCompra,
      precioVenta: item.precioVenta,
      proveedor: item.proveedor || '',
      ubicacion: item.ubicacion || '',
      descripcion: item.descripcion || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      console.log('Intentando eliminar item con ID:', id);
      await inventarioService.eliminarItemInventario(id);
      toast.success('Item eliminado correctamente');
      fetchInventario();
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error completo al eliminar:', error);
      const errorMessage = error.response?.data?.msg || error.message || 'Error al eliminar el item';
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      categoria: 'Medicamentos',
      codigo: '',
      cantidad: '',
      stockMinimo: '',
      stockMaximo: '',
      unidadMedida: 'Unidades',
      precioCompra: '',
      precioVenta: '',
      proveedor: '',
      ubicacion: '',
      descripcion: ''
    });
    setEditingItem(null);
  };

  const getStockStatus = (item) => {
    if (item.cantidad === 0) return { color: 'text-red-600 bg-red-50', text: 'Agotado' };
    if (item.cantidad <= item.stockMinimo) return { color: 'text-yellow-600 bg-yellow-50', text: 'Bajo Stock' };
    return { color: 'text-green-600 bg-green-50', text: 'Disponible' };
  };

  if (!authDoctor?.token) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <FiPackage className="w-8 h-8 text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Nuevo Item
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <FiFilter className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredItems.length} items
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const stockStatus = getStockStatus(item);
              return (
                <div key={item._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.nombre}</h3>
                        <p className="text-sm text-gray-500">{item.codigo}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Categoría:</span>
                        <span className="font-medium">{item.categoria}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-medium">{item.cantidad} {item.unidadMedida}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Stock Mínimo:</span>
                        <span className="font-medium">{item.stockMinimo}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Precio Venta:</span>
                        <span className="font-medium">${item.precioVenta}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          console.log('ID del item a eliminar:', item._id);
                          setShowDeleteModal(item._id);
                        }}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay items en el inventario</h3>
            <p className="text-gray-500">Comienza agregando tu primer item al inventario</p>
          </div>
        )}
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {editingItem ? 'Editar Item' : 'Nuevo Item'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                    <input
                      type="text"
                      required
                      value={formData.codigo}
                      onChange={(e) => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                    <select
                      required
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad Medida *</label>
                    <select
                      required
                      value={formData.unidadMedida}
                      onChange={(e) => setFormData({...formData, unidadMedida: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      {unidadesMedida.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.cantidad}
                      onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stockMinimo}
                      onChange={(e) => setFormData({...formData, stockMinimo: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Máximo *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stockMaximo}
                      onChange={(e) => setFormData({...formData, stockMaximo: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Compra *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.precioCompra}
                      onChange={(e) => setFormData({...formData, precioCompra: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Venta *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.precioVenta}
                      onChange={(e) => setFormData({...formData, precioVenta: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                    <input
                      type="text"
                      value={formData.proveedor}
                      onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <input
                      type="text"
                      value={formData.ubicacion}
                      onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    rows="3"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Guardando...' : (editingItem ? 'Actualizar' : 'Crear')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar este item del inventario? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
