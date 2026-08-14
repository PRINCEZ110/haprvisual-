"""BOUCLE / TEDDY FABRIC SWIVEL CHAIR — Blender Python Build Script

Recreates the round, cream-colored shearling/boucle swivel armchair
(rounded merged seat + backrest + two puffy armrests, black swivel base).

HOW TO RUN
----------
Option A (inside Blender):
  1. Open Blender (2.9+ / 3.x / 4.x all work).
  2. Go to the "Scripting" tab.
  3. Click "Open" and select this file, or paste its contents into a new text block.
  4. Click the "Run Script" (play) button.
  5. Switch to the "Layout" tab, press Numpad-0 for camera view, then
     Render > Render Image (F12) to see the result.

Option B (command line, headless):
  blender --background --factory-startup --python boucle_swivel_chair.py -- --render
  (add "-- --render" at the end to auto-render to //render_chair.png)

WHAT THIS SCRIPT DOES
----------------------
1. Clears the default scene.
2. Builds the chair from a metaball system (organic blob-merge shapes are
   exactly how this "puffy, seamless cushions merging into each other" look
   is achieved — much better than boolean-unioned meshes).
3. Converts the metaballs to a mesh, cleans it up, and shades it smooth.
4. Builds a black swivel pedestal base.
5. Creates a boucle/teddy fabric shader (bumpy Voronoi-based micro-nub
   texture + optional hair particle "fuzz" for close-up realism).
6. Sets up three-point studio lighting + a simple mirror/curtain backdrop
   echoing the reference photo, and a camera framed on the chair.

Feel free to tweak the PARAMETERS section below first — that's the fastest
way to adjust proportions before you commit to fuzz particle counts (which
are the most expensive part to recompute).
"""

import bpy
import math
import random
from mathutils import Vector

# ------------------------------------------------------------------
# PARAMETERS — tweak these first
# ------------------------------------------------------------------
SEAT_RADIUS          = 0.55
SEAT_HEIGHT           = 0.30
BACKREST_RADIUS       = 0.62
ARM_RADIUS            = 0.34
CHAIR_WIDTH           = 1.55        # overall width across armrests
CHAIR_DEPTH           = 1.25
SEAT_TOP_Z             = 0.42        # height of seat cushion center off floor
BASE_HEIGHT           = 0.12
FABRIC_COLOR          = (0.94, 0.90, 0.83, 1.0)   # warm cream
ADD_HAIR_FUZZ         = True        # turn off for faster viewport / test renders
HAIR_COUNT            = 40000       # reduce to 5000-ish for quick previews
BUILD_ROOM_BACKDROP   = True        # mirror + curtain + floor like the reference photo


def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block_collection in (bpy.data.meshes, bpy.data.metaballs, bpy.data.materials,
                              bpy.data.curves, bpy.data.lights, bpy.data.cameras):
        for block in list(block_collection):
            if block.users == 0:
                block_collection.remove(block)


def add_meta_element(mb, co, radius, stiffness=1.0, scale=(1, 1, 1), rot=(0, 0, 0), shape='BALL'):
    el = mb.elements.new()
    el.co = co
    el.radius = radius
    el.stiffness = stiffness
    el.type = shape
    if shape in {'BALL'}:
        pass
    el.size_x, el.size_y, el.size_z = scale
    return el


def build_chair_metaballs():
    """Build the soft, merged cushion silhouette using metaballs."""
    mb_data = bpy.data.metaballs.new('ChairMeta')
    mb_data.resolution = 0.035
    mb_data.render_resolution = 0.018
    mb_data.threshold = 1.05
    mb_obj = bpy.data.objects.new('ChairBlob', mb_data)
    bpy.context.collection.objects.link(mb_obj)

    # --- Seat cushion: a wide, flattened puffy disc ---
    add_meta_element(mb_data, (0, 0.02, SEAT_TOP_Z), SEAT_RADIUS,
                      scale=(1.15, 1.0, 0.55))

    # A slightly smaller inner seat bump for the "tufted center" pillow look
    add_meta_element(mb_data, (0, -0.05, SEAT_TOP_Z + 0.08), SEAT_RADIUS * 0.55,
                      scale=(1.0, 0.9, 0.5))

    # --- Backrest: tall rounded blob rising up and tilted slightly back ---
    add_meta_element(mb_data, (0, -0.42, SEAT_TOP_Z + 0.55), BACKREST_RADIUS,
                      scale=(1.05, 0.55, 1.15))
    # A rounded "pillow crest" that caps the top of the backrest (like ref photo)
    add_meta_element(mb_data, (0, -0.40, SEAT_TOP_Z + 1.05), BACKREST_RADIUS * 0.62,
                      scale=(1.0, 0.7, 0.55))

    # --- Left & right armrests: big rounded vertical lobes ---
    arm_x = CHAIR_WIDTH / 2 - ARM_RADIUS * 0.55
    for side in (-1, 1):
        add_meta_element(
            mb_data,
            (side * arm_x, -0.05, SEAT_TOP_Z + 0.30),
            ARM_RADIUS,
            scale=(0.8, 1.05, 1.35),
        )
        # small rounded cap on top of each armrest
        add_meta_element(
            mb_data,
            (side * arm_x, -0.05, SEAT_TOP_Z + 0.68),
            ARM_RADIUS * 0.62,
            scale=(0.85, 1.0, 0.6),
        )

    # --- Front lower "skirt" bulge so the seat looks like it wraps down to the base ---
    add_meta_element(mb_data, (0, 0.15, SEAT_TOP_Z - 0.28), SEAT_RADIUS * 0.98,
                      scale=(1.05, 0.85, 0.55))

    return mb_obj


def metaball_to_clean_mesh(mb_obj, name='BoucleChair'):
    # Force an update / depsgraph eval, then convert to mesh
    bpy.context.view_layer.objects.active = mb_obj
    bpy.ops.object.convert(target='MESH')
    mesh_obj = bpy.context.view_layer.objects.active
    mesh_obj.name = name

    # Clean topology a bit + smooth shading
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode='OBJECT')

    # Subsurf for extra smoothness on the render
    mod = mesh_obj.modifiers.new('Subsurf', 'SUBSURF')
    mod.levels = 2
    mod.render_levels = 3

    bpy.ops.object.shade_smooth()
    return mesh_obj


def build_base(mesh_obj):
    bpy.ops.mesh.primitive_cylinder_add(
        radius=SEAT_RADIUS * 0.62, depth=BASE_HEIGHT,
        location=(0, 0.02, BASE_HEIGHT / 2)
    )
    base = bpy.context.active_object
    base.name = 'SwivelBase'
    bpy.ops.object.shade_smooth()

    mat = bpy.data.materials.new('BaseMetal')
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (0.02, 0.02, 0.02, 1)
    bsdf.inputs['Roughness'].default_value = 0.35
    if 'Metallic' in bsdf.inputs:
        bsdf.inputs['Metallic'].default_value = 0.6
    base.data.materials.append(mat)

    # Small center foot so the seat doesn't clip through the base
    bpy.ops.mesh.primitive_cylinder_add(
        radius=SEAT_RADIUS * 0.18, depth=SEAT_TOP_Z - 0.25 - BASE_HEIGHT,
        location=(0, 0.02, BASE_HEIGHT + (SEAT_TOP_Z - 0.25 - BASE_HEIGHT) / 2)
    )
    foot = bpy.context.active_object
    foot.name = 'SwivelFoot'
    foot.data.materials.append(mat)
    bpy.ops.object.shade_smooth()

    return base, foot


def build_boucle_material():
    mat = bpy.data.materials.new('BoucleFabric')
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    for n in list(nodes):
        nodes.remove(n)

    out = nodes.new('ShaderNodeOutputMaterial')
    out.location = (600, 0)

    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (300, 0)
    bsdf.inputs['Base Color'].default_value = FABRIC_COLOR
    bsdf.inputs['Roughness'].default_value = 0.92
    if 'Sheen Weight' in bsdf.inputs:
        bsdf.inputs['Sheen Weight'].default_value = 0.35
    elif 'Sheen' in bsdf.inputs:
        bsdf.inputs['Sheen'].default_value = 0.35
    if 'Subsurface Weight' in bsdf.inputs:
        bsdf.inputs['Subsurface Weight'].default_value = 0.05
        bsdf.inputs['Subsurface Radius'].default_value = (0.3, 0.2, 0.15)

    # Bumpy micro-nub texture for the boucle look
    tex_coord = nodes.new('ShaderNodeTexCoord')
    tex_coord.location = (-900, 0)

    mapping = nodes.new('ShaderNodeMapping')
    mapping.location = (-700, 0)
    mapping.inputs['Scale'].default_value = (60, 60, 60)

    voronoi = nodes.new('ShaderNodeTexVoronoi')
    voronoi.location = (-500, 100)
    voronoi.voronoi_dimensions = '3D'
    voronoi.inputs['Randomness'].default_value = 1.0

    noise = nodes.new('ShaderNodeTexNoise')
    noise.location = (-500, -150)
    noise.inputs['Scale'].default_value = 120
    noise.inputs['Detail'].default_value = 4

    mix = nodes.new('ShaderNodeMixRGB')
    mix.location = (-250, 0)
    mix.blend_type = 'MULTIPLY'
    mix.inputs['Fac'].default_value = 0.5

    bump = nodes.new('ShaderNodeBump')
    bump.location = (0, -200)
    bump.inputs['Strength'].default_value = 0.35
    bump.inputs['Distance'].default_value = 0.02

    links.new(tex_coord.outputs['Object'], mapping.inputs['Vector'])
    links.new(mapping.outputs['Vector'], voronoi.inputs['Vector'])
    links.new(mapping.outputs['Vector'], noise.inputs['Vector'])
    links.new(voronoi.outputs['Distance'], mix.inputs['Color1'])
    links.new(noise.outputs['Fac'], mix.inputs['Color2'])
    links.new(mix.outputs['Color'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])

    return mat


def add_hair_fuzz(mesh_obj, mat):
    """Short curly hair particle system for close-up teddy-fabric fuzz."""
    psys_mod = mesh_obj.modifiers.new('Fuzz', 'PARTICLE_SYSTEM')
    psys = mesh_obj.particle_systems[-1]
    settings = psys.settings
    settings.type = 'HAIR'
    settings.count = HAIR_COUNT
    settings.hair_length = 0.035
    settings.use_advanced_hair = True
    settings.root_radius = 0.03
    settings.tip_radius = 0.005
    settings.child_type = 'INTERPOLATED'
    settings.rendered_child_count = 60
    settings.child_length = 0.9
    settings.clump_factor = 0.35
    settings.roughness_1 = 0.25
    settings.roughness_2 = 0.35
    settings.material_slot = mat.name if mat.name in [s.name for s in mesh_obj.material_slots] else ''
    # Curl the strands a bit for the "boucle loop" character
    settings.kink = 'CURL'
    settings.kink_amplitude = 0.015
    settings.kink_frequency = 4.0


def build_lighting_and_camera():
    # Key light (soft window light from camera-left, like the reference photo)
    bpy.ops.object.light_add(type='AREA', location=(-2.2, -2.6, 2.4))
    key = bpy.context.active_object
    key.data.energy = 400
    key.data.size = 2.0
    key.rotation_euler = (math.radians(60), 0, math.radians(-35))

    # Fill light (soft, low)
    bpy.ops.object.light_add(type='AREA', location=(2.0, -1.8, 1.4))
    fill = bpy.context.active_object
    fill.data.energy = 120
    fill.data.size = 2.5
    fill.rotation_euler = (math.radians(70), 0, math.radians(40))

    # Rim/back light for that soft edge glow on the fuzz
    bpy.ops.object.light_add(type='AREA', location=(0.3, 2.2, 2.0))
    rim = bpy.context.active_object
    rim.data.energy = 250
    rim.data.size = 1.5
    rim.rotation_euler = (math.radians(-70), 0, 0)

    # Camera
    bpy.ops.object.camera_add(location=(2.1, -3.0, 1.35))
    cam = bpy.context.active_object
    cam.rotation_euler = (math.radians(80), 0, math.radians(30))
    cam.data.lens = 50
    bpy.context.scene.camera = cam


def build_room_backdrop():
    # Floor
    bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, 0))
    floor = bpy.context.active_object
    floor.name = 'Floor'
    mat = bpy.data.materials.new('FloorMat')
    mat.use_nodes = True
    mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.85, 0.83, 0.8, 1)
    mat.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.5
    floor.data.materials.append(mat)

    # Back wall
    bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 3.5, 5))
    wall = bpy.context.active_object
    wall.rotation_euler = (math.radians(90), 0, 0)
    wall.name = 'Wall'
    wall_mat = bpy.data.materials.new('WallMat')
    wall_mat.use_nodes = True
    wall_mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.92, 0.91, 0.89, 1)
    wall.data.materials.append(wall_mat)

    # Simple arched mirror leaning against the wall (behind-left of chair)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(-1.1, 3.2, 1.1))
    mirror = bpy.context.active_object
    mirror.scale = (0.55, 1, 0.95)
    mirror.rotation_euler = (math.radians(90), 0, math.radians(3))
    mirror.name = 'MirrorGlass'
    mirror_mat = bpy.data.materials.new('MirrorMat')
    mirror_mat.use_nodes = True
    bsdf = mirror_mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Metallic'].default_value = 1.0
    bsdf.inputs['Roughness'].default_value = 0.02
    mirror.data.materials.append(mirror_mat)


def build_scene(do_render=False):
    clear_scene()

    mb_obj = build_chair_metaballs()
    chair_mesh = metaball_to_clean_mesh(mb_obj, name='BoucleChair')

    fabric_mat = build_boucle_material()
    chair_mesh.data.materials.append(fabric_mat)

    if ADD_HAIR_FUZZ:
        add_hair_fuzz(chair_mesh, fabric_mat)

    build_base(chair_mesh)

    if BUILD_ROOM_BACKDROP:
        build_room_backdrop()

    build_lighting_and_camera()

    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 128
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 2000
    scene.render.film_transparent = False

    if do_render:
        scene.render.filepath = '//render_chair.png'
        bpy.ops.render.render(write_still=True)


if __name__ == '__main__':
    import sys
    argv = sys.argv
    render_flag = '--render' in argv
    build_scene(do_render=render_flag)
    print('Boucle swivel chair build complete.') 
